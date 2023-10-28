import { NEXT_PUBLIC_BASE_URL } from "@/sanity/env";
import client, {
  updateClient,
  writeClient,
} from "@/sanity/sanityUtils/sanity-utils";

import { groq } from "next-sanity";

import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  const { data } = await req.json();

  const { medicalRecordNumber, password }: any = data;

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

export async function generateStaticParams() {
  const patientData = await fetch(
    `${NEXT_PUBLIC_BASE_URL}/api/patient/patientData`
  ).then((res) => res.json());

  return patientData.map((patient: any) => ({
    slug: patient.slug,
  }));
}
