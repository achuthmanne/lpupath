import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No proof file provided in request." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Ensure 'placement-proofs' bucket exists and is public
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      if (!buckets || !buckets.some((b) => b.name === "placement-proofs")) {
        await supabase.storage.createBucket("placement-proofs", {
          public: true,
          fileSizeLimit: 15728640, // 15MB
        });
      }
    } catch (bucketCheckErr) {
      console.warn("Bucket check warning:", bucketCheckErr);
    }

    // 2. Generate unique safe filename
    const originalName = file.name || "proof_document.pdf";
    const fileExt = originalName.split(".").pop() || "pdf";
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const safeStoragePath = `proofs/${timestamp}_${randomStr}.${fileExt}`;

    // 3. Convert file to Buffer for reliable server-side upload
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // 4. Upload to Supabase Storage using service role key (bypasses RLS)
    const { data: uploadData, error: uploadErr } = await supabase.storage
      .from("placement-proofs")
      .upload(safeStoragePath, fileBuffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (uploadErr) {
      console.error("Supabase Storage upload error:", uploadErr);
      return NextResponse.json(
        { success: false, error: uploadErr.message },
        { status: 500 }
      );
    }

    // 5. Retrieve public URL
    const { data: pubData } = supabase.storage
      .from("placement-proofs")
      .getPublicUrl(uploadData.path);

    return NextResponse.json({
      success: true,
      publicUrl: pubData.publicUrl,
      fileName: originalName,
      storagePath: uploadData.path,
    });
  } catch (err: any) {
    console.error("Upload API route exception:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to upload file to storage" },
      { status: 500 }
    );
  }
}
