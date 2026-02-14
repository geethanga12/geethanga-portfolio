export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  turnstileToken?: string;
  website?: string;
}

export interface ContactResponse {
  ok: boolean;
  message: string;
  requestId?: string;
  errors?: Record<string, string>;
}
