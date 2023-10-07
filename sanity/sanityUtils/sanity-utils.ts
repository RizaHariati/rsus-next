import { ClientConfig, createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "tis66dpo";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-09-29";
const clientConfig: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_TOKEN,
  // https://www.sanity.io/docs/api-versioning
  useCdn: true, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
};
const client = createClient(clientConfig);

export default client;

const writeConfig: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  token:
    "skkn8gXWWJMw1xI64QNk6AFSEedyFcthEmoWAOAmhvoMPT7xa6lO26oomOl898c6J8q5NXMAxsma0UNb30loUuZ6y885JuZvUe1VYU2j6BUr11clojnk13XCI8ZFefZNJnFq7cedomTP47Tyr4BOSaGdIdzRJ0PI0gZq5W5nqHo7SSyQKult",
  // https://www.sanity.io/docs/api-versioning
  useCdn: true, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
};

export const writeClient = createClient(writeConfig);
