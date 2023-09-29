import { groq } from "next-sanity";
import client from "./sanity-utils";

export const getDoctors = async () => {
  return client.fetch(groq`*[_type=='doctor']`);
};
