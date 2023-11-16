"use client";

import { NEXT_PUBLIC_BASE_URL } from "./sanity/env";

export default function myImageLoader({ src, width, quality }: any) {
  if (process.env.NODE_ENV === "production") {
    return `https://rsus-api.vercel.app/${src}?w=${width}&q=${quality || 75}`;
  } else {
    return `${NEXT_PUBLIC_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  }
}

// Docs: https://www.sanity.io/docs/image-urls
export function sanityLoader({ src, width, quality }: any) {
  const url = new URL(src);
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", width.toString());
  if (quality) {
    url.searchParams.set("q", quality.toString());
  }
  return url.href;
}
