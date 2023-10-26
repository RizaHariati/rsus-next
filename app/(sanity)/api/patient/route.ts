import client, {
  updateClient,
  writeClient,
} from "@/sanity/sanityUtils/sanity-utils";
import { NextApiRequest, NextApiResponse } from "next";

import { groq } from "next-sanity";
import { parseBody } from "next-sanity/webhook";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const medicalRecordNumber = req.nextUrl.searchParams.get("id");
  const password = req.nextUrl.searchParams.get("password");

  if (!password || password === "") {
    const data = await writeClient.fetch(
      groq`*[_type=='patient'
          && medical_record_number =='${medicalRecordNumber}'
          ]`
    );
    if (!data || data.length < 1) {
      return NextResponse.json({ status: 400, data: [] });
    } else {
      return NextResponse.json({ status: 200, data: data[0] });
    }
  } else {
    const data = await writeClient.fetch(
      groq`*[_type=='patient'
          && medical_record_number =='${medicalRecordNumber}'
          && patient_profile.password=='${password}'
          ]{ medical_record_number,
            patient_profile,
            "scheduled_appointments":scheduled_appointments[]{
               schedule_id,
               current_phone,
               tujuan,
               appointment_type,
               scheduled_date,
               register_date,
               using_bpjs,
               nomor_antrian},
             medical_records,
            "notifications" : notifications[]{
                id,
                notification_code,
                title,
                message,
                notification_date,
                seen
           }
        }`
    );

    if (!data || data.length < 1) {
      return NextResponse.json({ status: 400, data: [] });
    } else {
      return NextResponse.json({ status: 200, data: data[0] });
    }
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const posting = await writeClient.create({ ...body });
  return NextResponse.json(posting);
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const { _id, data } = await req.json();

  const responseData = await updateClient
    .patch(_id)
    .set({ notifications: [...data.notifications] })
    .commit();

  return NextResponse.json(responseData);
}
