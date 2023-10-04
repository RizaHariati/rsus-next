import React, { Suspense } from "react";

import FacilityPage from "@/app/(tools)/components/PageComponents/facility/FacilityPage";
import { getFacility } from "@/sanity/sanityUtils/getFacility";
import { FacilitySanityType } from "@/app/(tools)/types";
import Loading from "./loading";

type Props = {};

async function Facility(params: Props) {
  const dataFacility: FacilitySanityType[] = await getFacility();

  return <FacilityPage dataFacility={dataFacility} />;
}
export default Facility;
