import { Header } from "../components/header";

export const Layout = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex flex-col items-center">{children}</main>
    </div>
  );
};
