"use client";

import React from "react";

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // No authentication required - direct access to user pages
  return (
    <div className="layout-container relative min-h-screen bg-white">
      {/* Content area - TopNav is handled in Root Layout */}
      <div className="relative z-10 min-h-screen bg-white">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
