export const NEXT_PUBLIC_SANITY_API_VERSION =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-09-29";

export const NEXT_PUBLIC_SANITY_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const NEXT_PUBLIC_SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "tis66dpo";

export const useCdn = false;

export const NEXT_PUBLIC_SANITY_STUDIO_URL =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "studioUrl";

export const SANITY_DEPLOY_TOKEN = process.env.SANITY_DEPLOY_TOKEN;

export const SANITY_READ_WRITE_TOKEN = process.env.SANITY_READ_WRITE_TOKEN;

// export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const NEXT_PUBLIC_CONSUMER_URL =
  "https://rsuripsumoharjo-model.netlify.app";

export const NEXT_PUBLIC_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://rsus-api.vercel.app";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
