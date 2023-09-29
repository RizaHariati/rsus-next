import { ClientConfig, createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-09-29";
const clientConfig: ClientConfig = {
  projectId: "tis66dpo",
  dataset: "production",
  apiVersion: "2023-09-29",

  // https://www.sanity.io/docs/api-versioning
  useCdn: true, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
};
const client = createClient(clientConfig);

export default client;
