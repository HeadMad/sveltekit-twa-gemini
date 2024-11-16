import { BASE_URL, API_KEY } from '$env/static/private';
import { Gemini } from '$lib/utils';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {

  // return {};
  const gemini = Gemini(API_KEY, BASE_URL)
  .model('gemini-1.5-flash');
  const response = await gemini.generateContent({
    "contents": [{
      "parts": [{ "text": "Привет" }, { "text": "меня зовут Павел!" }]
    }]
  });


  return response;
}