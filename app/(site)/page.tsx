// import WelcomePage from "../(tools)/components/PageComponents/mainpage/WelcomePage";

import { NEXT_PUBLIC_BASE_URL } from "@/sanity/env";
import WelcomePage from "../(tools)/components/WelcomePageComponents/WelcomePage";

export default async function Welcome() {
  if (!NEXT_PUBLIC_BASE_URL) return null;
  return <WelcomePage />;
}
