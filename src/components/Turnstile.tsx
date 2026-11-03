"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

export interface TurnstileRef {
  reset: () => void;
}

interface TurnstileProps {
  siteKey?: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  theme?: "light" | "dark" | "auto";
  className?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

const Turnstile = forwardRef<TurnstileRef, TurnstileProps>(
  ({ siteKey, onVerify, onExpire, onError, theme = "dark", className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const effectiveSiteKey =
      siteKey || process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || "";

    // Keep callback refs fresh without causing re-renders
    const onVerifyRef = useRef(onVerify);
    const onExpireRef = useRef(onExpire);
    const onErrorRef = useRef(onError);

    useEffect(() => {
      onVerifyRef.current = onVerify;
      onExpireRef.current = onExpire;
      onErrorRef.current = onError;
    });

    useImperativeHandle(ref, () => ({
      reset: () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    useEffect(() => {
      if (!effectiveSiteKey) return;

      let isMounted = true;

      const renderWidget = () => {
        if (!containerRef.current || !window.turnstile || !isMounted) return;
        
        // Prevent re-rendering if already rendered
        if (widgetIdRef.current) return;

        try {
          // Clear container innerHTML to avoid duplicated iframes
          containerRef.current.innerHTML = "";

          const id = window.turnstile.render(containerRef.current, {
            sitekey: effectiveSiteKey,
            theme: theme,
            size: "normal",
            callback: (token: string) => {
              if (isMounted && onVerifyRef.current) {
                onVerifyRef.current(token);
              }
            },
            "expired-callback": () => {
              if (isMounted && onExpireRef.current) {
                onExpireRef.current();
              }
            },
            "error-callback": () => {
              if (isMounted && onErrorRef.current) {
                onErrorRef.current();
              }
            },
          });
          widgetIdRef.current = id;
        } catch (err) {
          console.error("Turnstile render error:", err);
        }
      };

      // Check if turnstile script already exists
      const existingScript = document.getElementById("cf-turnstile-script");

      if (window.turnstile) {
        renderWidget();
      } else if (!existingScript) {
        window.onloadTurnstileCallback = () => {
          renderWidget();
        };

        const script = document.createElement("script");
        script.id = "cf-turnstile-script";
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback&render=explicit";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      } else {
        const originalCallback = window.onloadTurnstileCallback;
        window.onloadTurnstileCallback = () => {
          if (originalCallback) originalCallback();
          renderWidget();
        };
      }

      return () => {
        isMounted = false;
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // ignore
          }
          widgetIdRef.current = null;
        }
      };
    }, [effectiveSiteKey, theme]);

    if (!effectiveSiteKey) {
      return null;
    }

    return (
      <div className={className || "flex justify-center my-2"}>
        <div ref={containerRef} className="min-w-[300px] min-h-[65px]" />
      </div>
    );
  }
);

Turnstile.displayName = "Turnstile";

export default Turnstile;
