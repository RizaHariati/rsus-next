import React from "react";

import FacilityPage from "@/app/(tools)/components/PageComponents/facility/FacilityPage";
import { getFacility } from "@/sanity/sanityUtils/getFacility";
import { FacilitySanityType } from "@/app/(tools)/types";
import dataFacility from "@/app/(tools)/data/data_facility.json";

type Props = {};

async function Facility(params: Props) {
  const dataFacility: FacilitySanityType[] = await getFacility();

  return <FacilityPage dataFacility={dataFacility} />;
}
export default Facility;
