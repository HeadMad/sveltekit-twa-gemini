export default function Gemini(baseUrl, apiKey) {

  const self = {
    models() {
      return sendRequest(createUrl({ baseUrl, apiKey }));
    },

    model(model = 'gemini-1.5-flash',) {
      return new Proxy(self, {
        get: (target, prop) => {
          if (prop in target)
            return target[prop];
          return async (payload = {}) => {
            return sendRequest(createUrl({ baseUrl, apiKey, model, action: prop }), payload);
          }
        }
      });
    };


  };

  return 
}


/**
 * Creates the URL for the API query.
 *
 * @param {string} baseUrl The base URL of the API.
 * @param {string} apiKey The API key.
 * @param {string} [model=''] The model name.
 * @param {string} [action=''] The action name.
 * @returns {string} The URL.
 */
function createUrl({ baseUrl, apiKey, model = '', action }) {
  const path = encodeURIComponent('/models/' + model + (action ? ':' + action : '') + '?key=' + apiKey);
  return baseUrl + path;
}


/**
 * Sends an HTTP request to the specified URL with an optional payload.
 * 
 * If a payload is provided, the request is sent as a POST request with
 * the payload serialized as JSON. If no payload is provided, a GET request
 * is sent.
 * 
 * @param {string} url - The URL to send the request to.
 * @param {Object} [payload] - The optional payload to send with the request.
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON response.
 */
async function sendRequest(url, payload) {
  const response = !payload ? await fetch(url) : await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return await response.json();
}