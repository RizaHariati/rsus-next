import Admin from "./Admin";

export const dynamic = "force-static";

export default function AdminPage() {
  return (
    <div className="relative top-14 left-0 w-full h-[calc(100%-56px)] overflow-y-scroll scrollbar-thin">
      <Admin />
    </div>
  );
}
