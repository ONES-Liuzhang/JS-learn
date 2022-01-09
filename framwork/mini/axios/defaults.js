function getDefaultAdaptor() {}

export const defaults = {
  adaptor: getDefaultAdaptor(),

  validateStatus: function validateStatus(status) {
    return (status >= 200 && status < 300) || status === 304;
  },
};
