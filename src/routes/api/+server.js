import { json } from '@sveltejs/kit';
import { BASE_URL, API_KEY } from '$env/static/private';
import { Gemini } from '$lib/utils';

export async function POST({fetch, request}) {
  const gemini = Gemini(BASE_URL, API_KEY)('gemini-1.5-flash');

  
  
}