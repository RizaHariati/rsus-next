import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="sticky z-40 left-0 top-0 w-full">
      <div className="w-full flex items-center justify-between p-4 px-20 bg-white">
        <Link href="/">Enter</Link>
        <Link href="/homepage">HomePage</Link>
        <Link href="/facility">Facility</Link>
        <Link href="/laboratorium">Laboratorium</Link>
        <Link href="/appointment">Appointment</Link>
        <Link href="/about">Tentang</Link>
        <Link href="/activity">Aktivitas</Link>
      </div>
    </div>
  );
};

export default Navbar;
