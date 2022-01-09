import { forEach, isArray, isDate, isPlainObject } from '../utils'

export default function buildURL(url, params, paramsSerializer) {
  if (!url) {
    return;
  }

  let serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else {
    const parts

    forEach(params, function serialize(val, key) {
      if (!key) {
        return
      }

      if (isArray(val)) {
        key += "[]"
      } else {
        val = [val]
      }

      forEach(val, function parseValue(v) {
        if(isDate(v)) {
          v = v.toISOString()
        } else if(isPlainObject(v)) {
          v = JSON.stringify(v)
        }
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(v))
      })

      serializedParams = parts.join('&')
    })
  }

  if (serializedParams) {
    url += url.indexOf("?") ? "&" : "?" + serializedParams;
  }

  return url;
}
