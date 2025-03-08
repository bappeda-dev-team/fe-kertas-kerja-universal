"use client";

import React from "react";

interface UserRoleBadgeProps {
  role?: string;
}

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  admin_opd: "Admin Opd",
  eselon_1: "ASN Level 1",
  eselon_2: "ASN Level 2",
  eselon_3: "ASN Level 3",
  eselon_4: "ASN Level 4",
  level_1: "ASN Level 1",
  level_2: "ASN Level 2",
  level_3: "ASN Level 3",
  level_4: "ASN Level 4",
  reviewer: "Reviewer",
};

const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
  const label = roleLabels[role || ""] || "Loading";
  const isText = role === "super_admin" || role === "admin_opd" || role === "eselon_1";

  const className =
    "border border-white text-white px-3 py-2 mx-1 min-w-20 max-h-[37.5px] rounded-lg hover:bg-white hover:text-gray-800";

  return isText ? <p className={className}>{label}</p> : <p className={className}>{label}</p>;
};

export default UserRoleBadge;