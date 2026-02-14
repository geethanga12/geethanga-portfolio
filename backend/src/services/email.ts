import nodemailer from 'nodemailer';
import { config } from '../config.js';
import { ContactPayload } from '../types.js';
import { logError, logInfo } from '../utils/logger.js';

const isGmailUser = config.smtp.user.toLowerCase().endsWith('@gmail.com');
const smtpHost = config.smtp.host || (isGmailUser ? 'smtp.gmail.com' : '');
const smtpSecure = config.smtp.host
  ? config.smtp.secure
  : isGmailUser
    ? true
    : config.smtp.secure;
const smtpPort = config.smtp.host ? config.smtp.port : isGmailUser ? 465 : config.smtp.port;

const hasSmtpConfig = Boolean(smtpHost && config.smtp.user && config.smtp.pass && config.smtp.to);

const transporter = hasSmtpConfig
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    })
  : null;

export const sendContactEmail = async (
  payload: ContactPayload,
  requestId: string
): Promise<boolean> => {
  if (!transporter) {
    logInfo('Skipping email send because SMTP is not configured', { requestId });
    return false;
  }

  try {
    await transporter.sendMail({
      from: config.smtp.from,
      to: config.smtp.to,
      replyTo: payload.email,
      subject: `[Portfolio Contact] ${payload.subject}`,
      text: [
        `Request ID: ${requestId}`,
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Subject: ${payload.subject}`,
        '',
        payload.message,
      ].join('\n'),
    });
    return true;
  } catch (error) {
    logError('Failed to send contact email', { requestId, error });
    return false;
  }
};

export const verifyEmailTransport = async () => {
  if (!transporter) {
    logInfo('SMTP transport unavailable: contact emails will be stored only');
    return;
  }

  try {
    await transporter.verify();
    logInfo('SMTP transport verified successfully');
  } catch (error) {
    logError('SMTP verify failed', { error });
  }
};
