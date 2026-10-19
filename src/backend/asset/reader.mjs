export async function readAsset(file, read) {
  try {
    return await read(file);
  } catch (error) {
    if (error?.code === "ENOENT" || error?.code === "ENOTDIR") return null;
    throw error;
  }
}
