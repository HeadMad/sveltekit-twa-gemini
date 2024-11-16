
/**
 * @function Gemini
 * @description A factory function for generating an object that 
 *   provides an interface to the Gemini language model.
 * @param {string} key - API key for the Gemini model.
 * @param {string} [baseUrl='https://generativelanguage.googleapis.com'] - URL of the
 *   Gemini model service. This is usually the default value.
 * @returns {Object} An object with methods for interacting with the Gemini model.
 *   The object has the following properties:
 *   <ul>
 *     <li>{@link Gemini#models models} - Returns a list of all
 *       available models from the Gemini service.</li>
 *
 *     <li>{@link Gemini#model model} - Returns an object that provides
 *       an interface to the Gemini model with the given name. If no
 *       model name is provided, the default model is returned.</li>
 *   </ul>
 *   The object returned by {@link Gemini#model} has the following properties:
 *   <ul>
 *     <li>{@link Gemini#model.info info} - Returns information about the
 *       model.</li>
 *
 *     <li>Any other properties are treated as methods that accept a payload
 *       and return a Promise of the response.</li>
 *   </ul>
 */
export default function Gemini(key, baseUrl = 'https://generativelanguage.googleapis.com') {

  const self = {
    models() {
      return sendRequest(baseUrl + createPath('/v1beta/models/', null, {key}));
    },

    model(model = 'gemini-1.5-flash',) {
      const target = {
        info() {
          return sendRequest(baseUrl + createPath('/v1beta/models/' + model, '', {key}));
        }
      };
      
      return new Proxy(target, {
        get: (target, prop) => {
          if (prop in target)
            return target[prop];
          return async (payload = {}) => {
            
            return sendRequest(baseUrl + createPath('/v1beta/models/' + model, prop, {key}), payload);
          }
        }
      });
    }


  };

  return self;
}



/**
 * Creates a URL path by concatenating the path, action and query parameters.
 * @param {string} path - The base path to use.
 * @param {string} [action] - The action to append to the path.
 * @param {Object} [params] - The query parameters to append to the path.
 * @returns {string} The resulting URL path.
 */
function createPath(path, action, params = {}) {
  const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
  return path + (action ? ':' + action : '') + '?' + query;
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
  console.log({url})
  const response = !payload ? await fetch(url) : await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return await response.json();
}