"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    // Smooth entrance trigger on mount
    const timer = setTimeout(() => {
      setAnimating(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="w-full bg-white border-b border-[#E4E4E7]">
      {/* Navbar Height: h-16 (64px) on mobile, h-[72px] on desktop */}
      <div className="w-full px-4 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between">
        
        {/* Animated Brand Lockup (Left / Starting) - Tightened Gap */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 select-none group">
          
          {/* 1. Logo Mark (Cap & Orange Arrow) - Exact 36px Height */}
          <div
            className={`shrink-0 flex items-center transition-all duration-700 ease-out ${
              animating
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-90 -translate-x-2"
            }`}
          >
            <Image
              src="/logo-mark.png"
              alt="LPU PATH Logo"
              width={42}
              height={36}
              className="h-[32px] sm:h-[36px] w-auto object-contain block"
              priority
            />
          </div>

          {/* 2. Vertical Divider Line - Exact 36px Height */}
          <div
            style={{
              transitionDuration: "500ms",
              transitionDelay: "100ms",
            }}
            className={`w-[1.75px] sm:w-[2px] h-[32px] sm:h-[36px] bg-[#111111] rounded-full shrink-0 origin-center transition-all ease-out ${
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
                  className="text-lg sm:text-[20px] font-black text-[#111111] tracking-[-0.03em] leading-none"
                  style={{ fontWeight: 800 }}
                >
                  LPU
                </span>
                <span
                  className="text-lg sm:text-[20px] font-black text-[#FF6500] tracking-[-0.03em] leading-none"
                  style={{ fontWeight: 800 }}
                >
                  PATH
                </span>
              </div>

              {/* Tagline: KNOW BEFORE YOUR TURN. */}
              <div className="leading-none">
                <p
                  className="text-[7.5px] sm:text-[8.5px] text-[#111111] uppercase tracking-[0.26em] font-semibold whitespace-nowrap leading-none"
                  style={{ fontWeight: 600 }}
                >
                  KNOW BEFORE YOUR TURN.
                </p>
              </div>
            </div>
          </div>

        </Link>

        {/* Right side is intentionally empty - ready for user direction */}
        <div className="flex items-center">
          {/* Waiting for next instructions */}
        </div>

      </div>
    </header>
  );
}
