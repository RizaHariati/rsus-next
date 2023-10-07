"use client";

import React, { useEffect } from "react";

import config from "@/sanity.config";
import { NextStudio } from "next-sanity/studio";
import { useGlobalContext } from "@/app/(tools)/context/AppProvider";

type Props = {};

export default function Admin() {
  return <NextStudio config={config} />;
}
