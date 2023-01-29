import { Header } from "../components/header";

export const Layout = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        {children}
      </main>
    </div>
  );
};
