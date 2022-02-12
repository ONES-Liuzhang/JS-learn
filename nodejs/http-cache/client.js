const defaultConfig = {
  headers: {
    "Content-Type": "text/plain",
  },
};

function request(url, config = defaultConfig) {
  const promise = fetch(url, config);

  return promise.then((response) => {
    return response.text();
  });
}
