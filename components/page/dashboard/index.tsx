/* eslint-disable jsdoc/require-returns */
"use client";

import React from "react";
import Sidebar from "./sidebar";

/**
 *
 */
export default function Dashboard() {
  return (
    <div className="z-10 flex w-full flex-col px-4">
      <Sidebar />
    </div>
  );
}
