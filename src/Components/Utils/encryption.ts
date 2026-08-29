import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export function encrypt(text: string) {
  const scrambledData = CryptoJS.AES.encrypt(text, SECRET_KEY);
  return scrambledData.toString();
}

export function decrypt(cipherText: string) {
  const decryptedBytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const plainTextResult = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return plainTextResult;
}