import { Buffer } from 'node:buffer';

export function basicAuthHeader() {
    const user = process.env.BASIC_AUTH_USER!;
    const pass = process.env.BASIC_AUTH_PASS!;
    const token = Buffer.from(`${user}:${pass}`).toString('base64');
    return `Basic ${token}`;
}