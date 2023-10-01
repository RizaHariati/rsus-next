import { type SchemaTypeDefinition } from "sanity";
import { doctor } from "./doctor-schema";
import { facility } from "./facility-schema";
import { patient } from "./patient-schema";
import { refnotification } from "./ref-notification-schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [doctor, facility, patient, refnotification],
};
