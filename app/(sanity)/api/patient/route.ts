import client, { writeClient } from "@/sanity/sanityUtils/sanity-utils";
import { NextApiRequest, NextApiResponse } from "next";

import { groq } from "next-sanity";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // const medicalRecordNumber = req.nextUrl.searchParams.get("search");
  // const password = req.nextUrl.searchParams.get("password");

  // if (!password) {
  //   const data = await writeClient.fetch(
  //     groq`*[_type=='patient'
  //         && medical_record_number =='${medicalRecordNumber}'
  //         ]`
  //   );
  //   return NextResponse.json({ data: data[0] });
  // } else {
  const data = await writeClient.fetch(
    groq`*[_type=='patient'

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
  return NextResponse.json({ data: data[0] });
  // }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const posting = await writeClient.create({ ...body });
  return NextResponse.json(posting);
}
// && medical_record_number =='${medicalRecordNumber}'
// && patient_profile.password=='${password}'
