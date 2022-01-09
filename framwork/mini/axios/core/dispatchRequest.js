import xhrAdapter from "../adapters/xhr";

// 真正发送请求的地方
export default function dispatchRequest(config) {
  const adapter = config.adapter || xhrAdapter;

  return adapter(config).then(
    function onAdapterResolution(response) {
      return response;
    },
    function onAdapterRejection(reason) {
      return Promise.reject(reason);
    }
  );
}
