/**
 * 拼接url
 * @param {*} baseURL
 * @param {*} relativeURL
 * @returns
 */
export default function combineURLs(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, "") + relativeURL.replace(/^\/+/, "");
}
