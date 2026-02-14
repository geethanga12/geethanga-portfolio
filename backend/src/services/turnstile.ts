import { config } from '../config.js';

interface TurnstileResult {
  ok: boolean;
  reason?: string;
}

interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
}

export const verifyTurnstile = async (
  token: string | undefined,
  remoteIp: string
): Promise<TurnstileResult> => {
  if (!config.turnstileEnabled) return { ok: true };

  if (!token) {
    return { ok: false, reason: 'missing_turnstile_token' };
  }

  if (!config.turnstileSecret) {
    return { ok: false, reason: 'missing_turnstile_secret' };
  }

  const body = new URLSearchParams({
    secret: config.turnstileSecret,
    response: token,
    remoteip: remoteIp,
  });

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    return { ok: false, reason: 'turnstile_upstream_failure' };
  }

  const result = (await response.json()) as TurnstileVerifyResponse;
  if (!result.success) {
    return { ok: false, reason: result['error-codes']?.join(',') || 'turnstile_failed' };
  }

  return { ok: true };
};
