export function getURLfromFile(file: File): string {
  return URL.createObjectURL(file)
}
