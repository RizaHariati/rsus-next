"use client";

export default function myImageLoader({ src, width, quality }: any) {
  return `https://rsuripsumoharjo-model.netlify.app/${src}?w=${width}&q=${
    quality || 75
  }`;
}
