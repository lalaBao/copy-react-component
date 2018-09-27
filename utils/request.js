import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

export const parseParams = (params) => (
  Object.keys(params).map((key) => (`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)).join('&')
);


export const parseFilteredParams = (params) => (
  Object.keys(params).filter((key) => params[key] !== undefined).map((key) => (`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)).join('&')
);

export function getRequest(url, params) {
  if (params) {
    return request(`${url}?${parseFilteredParams(params)}`, {
      credentials: 'include',
    });
  }
  return request(url, {
    credentials: 'include',
  });
}

export function postRequest(url, params) {
  return request(url, {
    method: 'POST',
    body: params ? parseParams(params) : '',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
  });
}
