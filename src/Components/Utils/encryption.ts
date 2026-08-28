import bcrypt from 'bcryptjs';

export function encrypt(text: string): string {
  if (!text) return '';
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(text, salt);
}

export function decrypt(cipherText: string): string {
  return cipherText;
}

export function verifyPassword(passwordInput: string, storedHash: string): boolean {
  return bcrypt.compareSync(passwordInput, storedHash);
}
