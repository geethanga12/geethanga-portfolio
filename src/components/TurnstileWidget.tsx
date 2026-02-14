import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (selector: HTMLElement, options: Record<string, unknown>) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId?: string) => void;
    };
  }
}

interface TurnstileWidgetProps {
  siteKey: string;
  onTokenChange: (token: string) => void;
  onExpire: () => void;
}

const TURNSTILE_SCRIPT_ID = 'cf-turnstile-script';

const TurnstileWidget = ({ siteKey, onTokenChange, onExpire }: TurnstileWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!siteKey) return;

    const existing = document.getElementById(TURNSTILE_SCRIPT_ID);
    if (existing) {
      setIsReady(true);
      return;
    }

    const script = document.createElement('script');
    script.id = TURNSTILE_SCRIPT_ID;
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => setIsReady(true);
    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [siteKey]);

  useEffect(() => {
    if (!isReady || !containerRef.current || !window.turnstile || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: (token: string) => onTokenChange(token),
      'expired-callback': () => {
        onTokenChange('');
        onExpire();
      },
      'error-callback': () => {
        onTokenChange('');
      },
      theme: 'auto',
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [isReady, onExpire, onTokenChange, siteKey]);

  if (!siteKey) return null;

  return (
    <div className="space-y-2">
      <div ref={containerRef} />
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Protected by Cloudflare Turnstile.
      </p>
    </div>
  );
};

export default TurnstileWidget;
