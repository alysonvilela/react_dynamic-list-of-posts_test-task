import { Post, User } from '../react-app-env';
import { BASE_URL } from './api';

export async function getUserPosts(userId: User['id']): Promise<Post[]> {
  try {
    const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
    const json: Post[] = await response.json();

    return json ?? [];
  } catch (err) {
    return [];
  }
}

export async function getPostById(postId: Post['id']): Promise<Post | null> {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`);
    const json: Post = await response.json();

    return json ?? null;
  } catch (err) {
    return null;
  }
}

export async function getAllPosts() {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const json: Post[] = await response.json();

    return json ?? [];
  } catch (err) {
    return [];
  }
}
