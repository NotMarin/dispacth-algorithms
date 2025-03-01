import Header from "@/components/organisms/Header/Header";

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header />

      <main className="flex-1 overflow-y-auto p-8">{children}</main>

      <footer className="p-4 text-center text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} - Santiago Marin Henao
      </footer>
    </div>
  );
}
