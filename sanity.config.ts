/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\admin\[[...index]]\page.tsx` route
 */
import { StudioNavbar, buildLegacyTheme } from "sanity";

const props = {
  "--my-white": "#fafaf9",
  "--my-black": "#404040",
  "--my-blue": "#007814",
  "--my-red": "#FF0202",
  "--my-yellow": "#f4b400",
  "--my-green": "#0f9d58",
};

export const myTheme = buildLegacyTheme({
  /* Base theme colors */
  "--black": props["--my-black"],
  "--white": props["--my-white"],

  "--gray": "#5C5A5A",
  "--gray-base": "#5C5A5A",

  "--component-bg": props["--my-white"],
  "--component-text-color": props["--my-black"],

  /* Brand */
  "--brand-primary": props["--my-blue"],

  // Default button
  "--default-button-color": "#5C5A5A",
  "--default-button-primary-color": props["--my-blue"],
  "--default-button-success-color": props["--my-green"],
  "--default-button-warning-color": props["--my-yellow"],
  "--default-button-danger-color": props["--my-red"],

  /* State */
  "--state-info-color": props["--my-blue"],
  "--state-success-color": props["--my-green"],
  "--state-warning-color": props["--my-yellow"],
  "--state-danger-color": props["--my-red"],

  /* Navbar */
  "--main-navigation-color": props["--my-black"],
  "--main-navigation-color--inverted": props["--my-white"],

  "--focus-color": props["--my-blue"],
});

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works

import { schema } from "./sanity/schema";
import {
  NEXT_PUBLIC_SANITY_API_VERSION,
  NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_PROJECT_ID,
} from "./sanity/env";

import { LayoutProps } from "framer-motion";
import { DashboardIcon } from "@sanity/icons";
import MyNavbar from "./app/(tools)/components/MyNavbar";
import MyLayout from "./app/(tools)/components/MyLayout";

export const myCustomLayout: any = () => {
  return {
    title: "My Custom Layout",
    name: "my-custom-layout",
    icon: DashboardIcon,
    component: (props: LayoutProps) => MyLayout,
  };
};
export default defineConfig({
  theme: myTheme,
  basePath: "/admin",
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  tools: [myCustomLayout()],
  studio: {
    components: {
      layout: MyLayout,
      navbar: MyNavbar,
    },
  },
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    deskTool(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: NEXT_PUBLIC_SANITY_API_VERSION }),
  ],
});
