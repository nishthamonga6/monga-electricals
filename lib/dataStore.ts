// dataStore removed: placeholder to neutralize the file-backed API implementation
// The real implementation was removed per the user's request.
export function readJson(_filename: string): any {
  throw new Error('dataStore removed: file-backed API disabled');
}

export function writeJson(_filename: string, _data: any): void {
  throw new Error('dataStore removed: file-backed API disabled');
}
