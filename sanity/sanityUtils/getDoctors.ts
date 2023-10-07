import { groq } from "next-sanity";
import client from "./sanity-utils";

export const getDoctors = async () => {
  return await client.fetch(groq`*[_type=='doctor']`);
};
