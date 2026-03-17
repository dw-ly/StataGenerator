export function buildOutputFileName(baseName: string, extension: string) {
  const timestamp = new Date().toISOString().slice(0, 10);
  return `${baseName}-${timestamp}.${extension}`;
}
