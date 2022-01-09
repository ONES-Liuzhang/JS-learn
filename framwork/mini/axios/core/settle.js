import createError from "./createError";

export default function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;

  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError("Request failed with status code " + response.status));
  }
}
