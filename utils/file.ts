export function urlFromFile(file: File): string {
  return URL.createObjectURL(file)
}
