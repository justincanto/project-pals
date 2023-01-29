import { api } from "../utils/api";
import { PalCard } from "./palCard";

export const PalsList = () => {
  const users = api.user.getAll.useQuery();

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {users.data?.map((user) => (
        <PalCard
          description={user.description}
          name={user.name}
          role={user.role}
          image={user.image}
          key={user.id}
        />
      ))}
    </div>
  );
};
