export const base64ToFile = async (base64: string, filename: string) => {
  const base64Res = await fetch(base64);
  const blob = await base64Res.blob();
  const file = new File([blob], filename, { type: blob.type });

  return file;
};
