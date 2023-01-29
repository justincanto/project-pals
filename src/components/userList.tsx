import { api } from "../utils/api";

export const UserList = () => {
  const users = api.user.getAll.useQuery();

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {users.data?.map((user) => (
        <div key={user.id}>
          {user.name}
          <br />
          {user.email}
        </div>
      ))}
    </div>
  );
};
