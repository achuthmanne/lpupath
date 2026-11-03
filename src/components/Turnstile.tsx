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

        // Clean up previous widget if exists
        if (widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // ignore
          }
          widgetIdRef.current = null;
        }

        try {
          const id = window.turnstile.render(containerRef.current, {
            sitekey: effectiveSiteKey,
            theme: theme,
            size: "normal",
            callback: (token: string) => {
              if (isMounted) onVerify(token);
            },
            "expired-callback": () => {
              if (isMounted && onExpire) onExpire();
            },
            "error-callback": () => {
              if (isMounted && onError) onError();
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
        // Script is already in DOM but not yet loaded
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
    }, [effectiveSiteKey, theme, onVerify, onExpire, onError]);

    if (!effectiveSiteKey) {
      return null;
    }

    return (
      <div className={className || "flex justify-center my-3"}>
        <div ref={containerRef} />
      </div>
    );
  }
);

Turnstile.displayName = "Turnstile";

export default Turnstile;
