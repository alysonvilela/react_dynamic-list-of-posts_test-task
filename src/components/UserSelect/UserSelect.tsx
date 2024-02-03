import { User } from '../../react-app-env';
import './UserSelect.scss';

interface UserSelectProps {
  users: User[]
  selectedUserId: User['id'],
  onSelectUserId: (id: User['id']) => void
}

export const UserSelect = (
  {
    users,
    selectedUserId,
    onSelectUserId,
  }: UserSelectProps,
) => {
  return (
    <>
      {users && (
        <label>
          Select a user: &nbsp;
          <select
            className="selector"
            value={selectedUserId ?? 0}
            onChange={(event) => {
              onSelectUserId(Number(event.target.value));
            }}
          >
            <option value={0} disabled>
              All users
            </option>
            {users?.map((user) => (
              <option key={user.id} value={`${user.id}`}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      )}
    </>
  );
};
