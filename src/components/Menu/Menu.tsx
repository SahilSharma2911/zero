"use client"

import { menuItems } from "@/assets/Data";
import { IoSettingsOutline } from "react-icons/io5"
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Menu = () => {

  const path = usePathname()

  return (
    <div className=" mt-20 space-y-2 ">
      {menuItems.map((item, index) => (
        <Link href={item.path} key={index} className={`flex items-center gap-2 px-4  ${path === item.path ? "text-[#4850E4FF]" : ""} `}>
          <span className=" text-2xl">{item.icon}</span>
          <span className=" text-[0.9rem]">{item.label}</span>
        </Link>
      ))}
      <hr className=" mt-6 " />
      <Link href={"/settings"} className="flex items-center gap-2 px-4 mt-6  ">
          <span className=" text-2xl"><IoSettingsOutline/></span>
          <span className=" text-[0.9rem]">Settings</span>
        </Link>
    </div>
  );
};

export default Menu;
