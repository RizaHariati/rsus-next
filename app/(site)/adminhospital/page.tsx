import AdminHospitalContent from "@/app/(tools)/components/adminHospitalComponents/AdminHospitalContent";
// import LoadingPage from "./#loading";
import { Suspense } from "react";

type Props = {};

export default async function AdminHospitalPage() {
  return (
    <div className="ptn-container">
      <AdminHospitalContent />
    </div>
  );
}
