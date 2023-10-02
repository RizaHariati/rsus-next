import { ClientConfig, createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "tis66dpo";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-09-29";
const clientConfig: ClientConfig = {
  projectId,
  dataset,
  apiVersion,
  token:
    "skAXdT1hbbOUmgPZ8h3DOu9ETXgS7cNzXQwzI2sI8CW8psHaP9ueLX9Wjn2b5pWrORB8bRCgeYXzmPRYw3RAak4JDR3295NBCUFrY09M375Cl2qQr9Lwi6ODCwB6E7o0TYEzT0YAXh6Cb54lOyTQ19KuxlbYcYMb6wcz6YKso2LzWWkk7QGK",
  // https://www.sanity.io/docs/api-versioning
  useCdn: true, // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
};
const client = createClient(clientConfig);

export default client;
