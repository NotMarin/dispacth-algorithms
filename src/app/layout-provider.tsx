import Header from "@/components/organisms/Header/Header";

export default function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full flex-col">
      <Header />

      <main className="flex-1">{children}</main>
    </div>
  );
}
