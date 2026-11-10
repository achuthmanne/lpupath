"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface NavbarProps {
  userEmail?: string;
  onSignOut?: () => void;
}

export default function Navbar({ userEmail: propUserEmail, onSignOut }: NavbarProps = {}) {
  const [animating, setAnimating] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(propUserEmail || "");

  useEffect(() => {
    // Smooth entrance trigger on mount
    const timer = setTimeout(() => {
      setAnimating(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (propUserEmail) {
      setCurrentEmail(propUserEmail);
      return;
    }

    try {
      const supabase = createClient();
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user?.email) {
          setCurrentEmail(session.user.email);
        }
      });
    } catch (err) {
      console.error("Navbar session check error:", err);
    }
  }, [propUserEmail]);

  return (
    <header className="w-full bg-white border-b border-[#E4E4E7]">
      {/* Navbar Height: h-16 (64px) on mobile, h-[72px] on desktop */}
      <div className="w-full px-4 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between">
        
        {/* Animated Brand Lockup (Left / Starting) */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 select-none group">
          
          {/* 1. Vertical Line - Exact 36px Height */}
          <div
            style={{
              transitionDuration: "500ms",
              transitionDelay: "100ms",
            }}
            className={`w-[2px] sm:w-[2.5px] h-[32px] sm:h-[36px] bg-[#111111] rounded-full shrink-0 origin-center transition-all ease-out ${
              animating
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-0"
            }`}
          />

          {/* 3. Masked Container for Slit Reveal - Exact 36px Height with Tight Gap */}
          <div className="overflow-hidden h-[32px] sm:h-[36px] flex items-center pl-1 pr-1.5">
            <div
              style={{
                transitionDuration: "750ms",
                transitionDelay: "200ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className={`h-[32px] sm:h-[36px] flex flex-col justify-between py-[0.5px] transition-all ${
                animating
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-full"
              }`}
            >
              {/* Wordmark: LPU PATH */}
              <div className="flex items-baseline gap-1 sm:gap-1.5 leading-none">
                <span
                  className="text-[18px] sm:text-[21px] font-black text-[#111111] tracking-[-0.035em] leading-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
                >
                  LPU
                </span>
                <span
                  className="text-[18px] sm:text-[21px] font-black text-[#FF6500] tracking-[-0.035em] leading-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
                >
                  PATH
                </span>
              </div>

              {/* Tagline: KNOW BEFORE YOUR TURN. */}
              <div className="leading-none">
                <p
                  className="text-[8.5px] sm:text-[9.5px] text-[#111111] uppercase tracking-[0.25em] font-semibold whitespace-nowrap leading-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}
                >
                  KNOW BEFORE YOUR TURN.
                </p>
              </div>
            </div>
          </div>

        </Link>

        {/* Right side: Signed in user details */}
        {currentEmail ? (
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-[32px] sm:h-[36px] flex flex-col justify-between py-[0.5px] text-right">
              <span className="text-[10px] sm:text-[11px] font-medium text-[#71717A] leading-none">
                Signed in
              </span>
              <span className="text-xs sm:text-[14px] font-bold text-[#111111] leading-none truncate max-w-[180px] sm:max-w-[300px]">
                {currentEmail}
              </span>
            </div>
            {onSignOut && (
              <>
                {/* Vertical Divider Line */}
                <div className="w-[1px] h-[28px] sm:h-[32px] bg-[#E4E4E7] shrink-0" />

                <button
                  type="button"
                  onClick={onSignOut}
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#71717A] hover:text-red-600 hover:border-red-300 hover:bg-red-50 border border-[#E4E4E7] rounded-full transition cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center" />
        )}

      </div>
    </header>
  );
}
