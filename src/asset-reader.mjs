export async function readAsset(file, read) {
  try {
    return await read(file);
  } catch {
    return null;
  }
}
