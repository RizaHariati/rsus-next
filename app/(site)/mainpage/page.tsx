import React from "react";
import "../../styles/mainpage.css";

import MainPageContent from "@/app/(tools)/components/PageComponents/mainpage/MainPageContent";
import { FacilitySanityType } from "@/app/(tools)/types";
import { getFacility } from "@/sanity/sanityUtils/getFacility";
import { getPatient } from "@/sanity/sanityUtils/getPatient";

type Props = {};

async function MainPage(props: Props) {
  return <MainPageContent />;
}

export default MainPage;
