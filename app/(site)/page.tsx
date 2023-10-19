// import WelcomePage from "../(tools)/components/PageComponents/mainpage/WelcomePage";

import { NEXT_PUBLIC_BASE_URL } from "@/sanity/env";
import WelcomePage from "../(tools)/components/components/PageComponents/mainpage/WelcomePage";

export default async function Home() {
  if (!NEXT_PUBLIC_BASE_URL) return null;
  return <WelcomePage />;
}
