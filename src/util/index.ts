export function randomString(length: number = 6): string {
  const n = Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
  return n.toString();
}
