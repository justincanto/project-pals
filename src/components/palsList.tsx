import { api } from "../utils/api";
import { PalCard } from "./palCard";

export const PalsList = () => {
  const users = api.user.getAll.useQuery();

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {users.data?.map((user) => (
        <PalCard user={user} key={user.id} />
      ))}
    </div>
  );
};
