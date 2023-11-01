import client, {
  updateClient,
  writeClient,
} from "@/sanity/sanityUtils/sanity-utils";

import { groq } from "next-sanity";

import { NextRequest, NextResponse } from "next/server";
import {
  putByMRandAdminQuery,
  putByMRandPasswordQuery,
} from "../../components/patients.queries";

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ message: "You got it!" });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const posting = await writeClient.create({ ...body });
  return NextResponse.json(posting);
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const { _id, key, data } = await req.json();

  if (key === "patientData") {
    const { medicalRecordNumber, password }: any = data;

    const patientData =
      !password || password === ""
        ? await client.fetch(
            groq`*[_type=='patient'
          && medical_record_number =='${medicalRecordNumber}'
          ]`
          )
        : password === "admin"
        ? await client.fetch(putByMRandAdminQuery, {
            medicalRecordNumber,
          })
        : await writeClient.fetch(putByMRandPasswordQuery, {
            medicalRecordNumber,
            password,
          });

    if (!patientData || patientData.length < 1) {
      return NextResponse.json({ status: 400, data: [] });
    } else {
      return NextResponse.json({ status: 200, data: patientData[0] });
    }
  } else {
    const responseData = await writeClient
      .patch(_id)
      .set(
        key === "notifications"
          ? { notifications: [...data] }
          : { scheduled_appointments: [...data] }
      )
      .commit();

    return NextResponse.json(responseData);
  }
}
