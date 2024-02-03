import { User } from '../react-app-env';

export const BASE_URL = 'https://mate.academy/students-api/';

export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const json: User[] = await response.json();

    return json ?? [];
  } catch (err) {
    return [];
  }
}
