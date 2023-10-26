import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req: NextRequest, res: NextRequest) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.headers.set(
    "Authorization",
    "Bearer skOuTPWYzAeqk7ISYYWNtxpmhpbzmmDh1e1VZPLA1VWpSGufmcHLXtbSwrgHRboQu706ofMkRfApPVF2nUMEAnkaKu3lsuvnDDQTSuALJ7DmuXL3zUVOcn8ei1UjgDKnDGHUv8iDSCdH4RwDXTUFbVZaIuosoguVI9lJCt5gxjbsc16u0zgb"
  );
  NextResponse.next();
}
