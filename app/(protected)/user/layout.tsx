"use client";

import React from "react";
import { TopNav } from "../../../src/components/layout";
import Home from "@/app/page";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top navigation */}
      <TopNav />

      {children }
      <main className="flex-1 bg-gray-100">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
