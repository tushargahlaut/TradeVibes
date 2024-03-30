export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateName(name: string): boolean {
  const nameRegex = /^[A-Za-z\s'\d-]+$/;
  return nameRegex.test(name);
}
