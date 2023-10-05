import { groq } from "next-sanity";
import client from "./sanity-utils";

export const getUser = async () => {
  return client.fetch(groq`*[_type=='user']`);
};
