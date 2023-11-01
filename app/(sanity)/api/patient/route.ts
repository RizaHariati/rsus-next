import client, {
  updateClient,
  writeClient,
} from "@/sanity/sanityUtils/sanity-utils";

import { groq } from "next-sanity";

import { NextRequest, NextResponse } from "next/server";

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
      !password || password === "" || password === "admin"
        ? await client.fetch(
            groq`*[_type=='patient'
          && medical_record_number =='${medicalRecordNumber}'
          ]`
          )
        : await writeClient.fetch(
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

const groqGetPatient = (medicalRecordNumber: string, password: string) => {
  return groq`*[_type=='patient'
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
        }`;
};
