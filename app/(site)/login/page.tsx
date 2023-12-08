import LoginForm from "@/app/(tools)/components/LoginComponents/LoginForm";
import React from "react";

type Props = {};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-black bg-opacity-40">
      <div className="standard-border p-3 max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
