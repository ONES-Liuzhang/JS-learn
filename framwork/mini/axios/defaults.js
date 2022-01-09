function getDefaultAdaptor() {
  let adaptor;
  if (typeof XMLHttpRequest !== "undefined") {
    adaptor = import("./adapters/xhr");
  } else if (
    typeof process !== "undefined" &&
    Object.prototype.toString.call(process) === "[object process]"
  ) {
    adaptor = import("./adapters/http");
  }
  return adaptor;
}

const defaults = {
  adaptor: getDefaultAdaptor(),

  validateStatus: function validateStatus(status) {
    return (status >= 200 && status < 300) || status === 304;
  },
};

export default defaults;
