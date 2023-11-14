import { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { NextRequest, NextResponse } from "next/server";

import {
  getLabSatuanByIDQuery,
  getLabSatuanQuery,
} from "../../components/laboratorium.queries";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  const data = id
    ? await writeClient.fetch(getLabSatuanByIDQuery, { id })
    : await writeClient.fetch(getLabSatuanQuery);

  return NextResponse.json(data);
}
