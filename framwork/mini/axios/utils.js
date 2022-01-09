export function mergeOptions(conf1, conf2) {}

export function forEach(obj, fn) {
  if (!obj) return;

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else if (Object.prototype.toString.call(obj) === "[object Object]") {
    for (let key in obj) {
      fn.call(null, obj[key], key, obj);
    }
  }
}

const _toString = Object.prototype.toString;

const isType = (str) => (obj) => _toString(obj) === `[object ${str}]`;

export const isArray = isType("Array");

export const isPlainObject = isType("Object");

export const isDate = isType("Date");

export function isAbsoluteURL(url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

export function combinedURL(baseURL, relativeURL) {
  return baseURL.replace(/\/+$/, "") + relativeURL.replace(/^\/+/, "");
}

/**
 * 拼接url路径
 * @param {*} baseUrl
 * @param {*} relativeUrl
 */
export function buildFullPath(baseURL, requestURL) {
  if (baseURL && !isAbsoluteURL(requestURL)) {
    return combinedURL(baseURL, requestURL);
  }

  return requestURL;
}

/**
 * 序列化url参数
 *
 * @param {*} url
 * @param {*} params
 */
export function buildURL(url, params, paramsSerializer) {
  if (!params) {
    return url;
  }

  let serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else {
    const part = [];

    forEach(params, function serialize(val, key) {
      // 不能直接写 !val 有字符串或者数字0会被误判
      if (val === null || typeof val === "undefined") {
        return;
      }

      if (isArray(val)) {
        key = key + "[]";
      } else {
        val = [val];
      }

      forEach(val, function parseValue(v) {
        if (isDate(v)) {
          v = v.toISOString();
        } else if (isPlainObject(v)) {
          v = JSON.stringify(v);
        }
        part.push(encodeURIComponent(key) + "=" + encodeURIComponent(v));
      });

      serializedParams = part.join("&");
    });
  }

  // TODO: 处理 hash
  if (serializedParams) {
    url += url.indexOf("?") === -1 ? "?" : "&" + serializedParams;
  }

  return url;
}
