import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'sl-app-9f83k2m1-secure-2026';

export function encrypt(text: string) {
  
  if (!text) return '';
  
  const scrambledData = CryptoJS.AES.encrypt(text, SECRET_KEY);
  return scrambledData.toString();
}

export function decrypt(cipherText: string) {
  if (!cipherText) return '';

  const decryptedBytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const plainTextResult = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return plainTextResult;
}
