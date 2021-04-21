const axios = function () {
  return function axios(config) {};
};

axios.run = function (config) {
  let chain = [
    {
      resolved: (config) => {
        return config;
      }, // axios  请求核心方法
      rejected: undefined,
    },
  ];

  chain = Array.prototype.concat(
    interceptors.request,
    chain,
    interceptors.response
  );

  let promise = Promise.resolve(config);
  while (chain.length) {
    let { resolved, rejected } = chain.shift();
    promise = promise.then(resolved, rejected);
  }
  return promise;
};

const interceptors = {
  request: [],
  response: [],
};

axios.interceptors = {
  request: {
    use(resolved, rejected) {
      interceptors.request.push({ resolved, rejected });
    },
  },
  response: {
    use(resolved, rejected) {
      interceptors.response.push({ resolved, rejected });
    },
  },
};

axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.a = "a";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (config) {
    config.b = "b";
    console.log(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.run({});
