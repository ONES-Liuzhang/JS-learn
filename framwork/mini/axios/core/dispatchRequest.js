import defaults from "../defaults";

// 真正发送请求的地方
export default function dispatchRequest(config) {
  const adapter = config.adapter || defaults.adaptor;

  return adapter(config).then(
    function onAdapterResolution(response) {
      return response;
    },
    function onAdapterRejection(reason) {
      return Promise.reject(reason);
    }
  );
}
