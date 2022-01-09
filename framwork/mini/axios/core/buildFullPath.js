import combinedURLs from "./combinedURLs";
import isAbsoluteURL from "./isAbsoluteURL";

export default function buildFullPath(baseURL, requestURL) {
  if (baseURL && !isAbsoluteURL(requestURL)) {
    return combinedURLs(baseURL, requestURL);
  }

  return requestURL;
}
