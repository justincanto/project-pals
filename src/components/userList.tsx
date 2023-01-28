import { api } from "../utils/api";

export const UserList = () => {
  const users = api.user.getAll.useQuery();

  return (
    <div className="mt-4 text-white">
      <h3 className="text-2xl font-bold">Profiles</h3>

      {users.data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
