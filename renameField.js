import { ClientConfig, createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "tis66dpo";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-09-29";
const clientConfig = {
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

const fetchDocuments = () =>
  client.fetch(`*[_type=='doctor'&&defined(nama)]{_id, nama}`);
const buildPatches = (docs) =>
  docs.map((doc) => ({
    id: doc._id,
    patch: {
      set: { name: doc.nama },
      unset: ["nama"],
    },
  }));

const createTransaction = (patches) =>
  patches.reduce(
    (tx, patch) => tx.patch(patch.id, patch.patch),
    client.transaction()
  );

const commitTransaction = (tx) => tx.commit();

const migrateNextBatch = async () => {
  const documents = await fetchDocuments();
  const patches = buildPatches(documents);
  if (patches.length === 0) {
    console.log("No more documents to migrate!");
    return null;
  }
  console.log(
    `Migrating batch:\n %s`,
    patches
      .map((patch) => `${patch.id} => ${JSON.stringify(patch.patch)}`)
      .join("\n")
  );
  const transaction = createTransaction(patches);
  await commitTransaction(transaction);
  return migrateNextBatch();
};

migrateNextBatch().catch((err) => {
  console.error(err);
  process.exit(1);
});
