import Admin from "./Admin";

export const dynamic = "force-static";

export default function AdminPage() {
  return (
    <div className="fixed top-14 left-0 w-full h-[90%] overflow-y-scroll">
      <Admin />
    </div>
  );
}
