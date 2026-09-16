"use client";

import { RoundLoader } from "@/components/RoundLoader";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-mist">
      <RoundLoader size={108} />
    </div>
  );
}
