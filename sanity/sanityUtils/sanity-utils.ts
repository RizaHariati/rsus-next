import { ClientConfig, createClient } from "next-sanity";
import {
  NEXT_PUBLIC_SANITY_API_VERSION,
  NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  SANITY_DEPLOY_TOKEN,
  SANITY_READ_WRITE_TOKEN,
} from "../env";

const projectId = NEXT_PUBLIC_SANITY_PROJECT_ID || "tis66dpo";
const dataset = NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = NEXT_PUBLIC_SANITY_API_VERSION || "2023-09-29";
const clientConfig: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  token: SANITY_DEPLOY_TOKEN,
  // https://www.sanity.io/docs/api-versioning,
  useCdn: process.env.NODE_ENV === "development", // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
};
const client = createClient(clientConfig);

export default client;

const writeConfig: ClientConfig = {
  projectId,
  dataset,
  apiVersion,

  token: SANITY_READ_WRITE_TOKEN,
  // https://www.sanity.io/docs/api-versioning
  useCdn: process.env.NODE_ENV === "development", // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
};

export const writeClient = createClient(writeConfig);
