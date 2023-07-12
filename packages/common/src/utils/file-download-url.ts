export function fileDownloadUrlHelper(baseUrl: string, fileId: string, filePath?: string): string {
  return `${baseUrl}/files/${fileId}/download${filePath ? `?path=${filePath}` : ''}`
}
