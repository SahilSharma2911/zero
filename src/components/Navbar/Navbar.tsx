import React from "react";
import { Input } from "../ui/input";
import { Bell, Clock, Search} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className=" bg-white py-4 px-4 flex justify-between items-center border-b">
      {/* Left side search bar   */}
      <div className="w-3/12 relative ml-12">
        <Search
          size={18}
          className="  absolute top-1/2 -translate-y-1/2 left-4 text-black "
        />
        <Input
          type="text"
          placeholder="Search..."
          className=" bg-[#F3F4F6FF] pl-10 text-black "
        />
      </div>

      {/* Right side user profile and notifications  */}
      <div className=" flex items-center gap-14">
        <Button className=" bg-lightBtn hover:bg-darkBlueBtn hover:scale-95 hover:cursor-pointer">
          <Clock />
          Clock In
        </Button>
        <div className=" flex items-center gap-4">
          <span>
            <Bell />
          </span>
          <span className=" bg-[#CED0F8FF] rounded-full p-1">
            <Image
              src={"/images/user.jpg"}
              alt="userImage"
              width={40}
              height={40}
              className=" rounded-full"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
