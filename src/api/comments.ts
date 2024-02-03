import { Comment, Post } from '../react-app-env';
import { BASE_URL } from './api';

export async function getComments(postId: Post['id']): Promise<Comment[]> {
  try {
    const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);
    const json: Comment[] = await response.json();

    return json ?? [];
  } catch (err) {
    return [];
  }
}

export async function delComment(id: Comment['id']): Promise<boolean> {
  try {
    await fetch(`${BASE_URL}/comments/${id}`, { method: 'DELETE' });

    return true;
  } catch (err) {
    return false;
  }
}

export async function postComment(
  name: string,
  email: string,
  body: string,
  postId: number,
): Promise<boolean> {
  try {
    await fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        postId,
        name,
        email,
        body,
      }),
    });

    return true;
  } catch (err) {
    return false;
  }
}
