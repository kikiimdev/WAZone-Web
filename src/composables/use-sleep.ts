export const useSleep = async (ms = 2000) =>
  await new Promise(r => setTimeout(r, ms))
