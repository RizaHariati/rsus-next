import { type SchemaTypeDefinition } from "sanity";
import { doctor } from "./doctor-schema";
import { facility } from "./facility-schema";
import { patient } from "./patient-schema";
import { refnotification } from "./ref-notification-schema";
import { labSatuan } from "./lab-satuan-schema";
import { labPaket } from "./lab-paket-schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [doctor, facility, patient, refnotification, labSatuan, labPaket],
};
