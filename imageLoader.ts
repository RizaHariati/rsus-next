"use client";

import { NEXT_PUBLIC_BASE_URL } from "./sanity/env";

export default function myImageLoader({ src, width, quality }: any) {
  if (process.env.NODE_ENV === "production") {
    return `https://rsus-api.vercel.app/${src}?w=${width}&q=${quality || 75}`;
  } else {
    return `${NEXT_PUBLIC_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  }
}
