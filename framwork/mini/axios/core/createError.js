export default function createError(message) {
  const err = new Error(message);
  // 增强 err  enhanceError
  return err;
}
