import { type SchemaTypeDefinition } from "sanity";
import { doctor } from "./doctor-schema";
import { facility } from "./facility-schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [doctor, facility],
};
