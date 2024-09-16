import { get } from './route.js';
import { put } from './PutProfile.js';

export async function handler(request) {
    if (request.method === 'GET') {
        return get(request);
    } else if (request.method === 'PUT') {
        return put(request);
    } else {
        return new Response('Method Not Allowed', { status: 405 });
    }
}