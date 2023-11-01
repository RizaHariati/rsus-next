"use client";
import { Card, Container, Text } from "@sanity/ui";

type Prop = {};

export default function HomePageComponent(props: Prop) {
  return (
    <div className="page-main-container">
      <section
        id="main-page-top"
        className="h-full md:min-h-screen w-full z-0 overflow-hidden flex flex-col md:flex-row relative snap-none md:snap-center bg-slate-300 pb-2 border-b border-greyBorder"
      >
        <div>
          <h1>Patient</h1>
          <h1>Hospital</h1>
        </div>
      </section>
    </div>
  );
}
