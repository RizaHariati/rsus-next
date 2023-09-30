"use client";

import React from "react";

import config from "@/sanity.config";
import { NextStudio } from "next-sanity/studio";

type Props = {};
export default function Admin() {
  return <NextStudio config={config} />;
}
