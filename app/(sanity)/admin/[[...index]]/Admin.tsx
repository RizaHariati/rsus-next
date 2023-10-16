"use client";

import React, { useEffect } from "react";

import config from "@/sanity.config";
import { NextStudio } from "next-sanity/studio";

type Props = {};
export const dynamic = "force-static";
export default function Admin() {
  return <NextStudio config={config} />;
}
