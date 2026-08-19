import CryptoJS from 'crypto-js';

// The secret password used to lock and unlock our data strings
const SECRET_KEY = 'shopping-list-app-secret-key-2026';

// Function to convert plain text into a scrambled secret code string
export function encrypt(text: string) {
  const scrambledData = CryptoJS.AES.encrypt(text, SECRET_KEY);
  return scrambledData.toString();
}

// Function to convert a scrambled secret code back into plain readable text
export function decrypt(cipherText: string) {
  const decryptedBytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const plainTextResult = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return plainTextResult;
}