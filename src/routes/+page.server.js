import {BASE_URL} from '$env/static/private';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const response = await fetch(BASE_URL + '/hello', {
    method: 'post'
  });

  const data = await response.text();
  return {
    url: BASE_URL,
    data
  };
}