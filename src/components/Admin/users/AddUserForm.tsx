import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";

interface teamMembersProps {
  id: number;
  name: string;
  email: string;
  color: string;
}

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const AddUserForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const teamMembersData = [
    {
      id: 1,
      name: "member1",
      email: "johndoe@gmail.com",
      color: "bg-red-200",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      color: "bg-blue-200",
    },
    {
      id: 3,
      name: "John Smith",
      email: "johnsmith@gmail.com",
      color: "bg-green-200",
    },
    {
      id: 4,
      name: "John Smith",
      email: "johnsmith@gmail.com",
      color: "bg-green-200",
    },
    {
      id: 5,
      name: "John Smith",
      email: "johnsmith@gmail.com",
      color: "bg-green-200",
    },
    {
      id: 6,
      name: "John Smith",
      email: "johnsmith@gmail.com",
      color: "bg-green-200",
    },
    {
      id: 7,
      name: "John Smith",
      email: "johnsmith@gmail.com",
      color: "bg-green-200",
    },
    {
      id: 8,
      name: "John Smith",
      email: "johnsmith@gmail.com",
      color: "bg-green-200",
    },
  ];

  const [selectedMember, setSelectedMember] = React.useState<
    teamMembersProps[]
  >([]);

  const [openMember, setOpenMember] = useState(false);

  const handleSelectMember = useCallback((member: teamMembersProps) => {
    setSelectedMember((prev) => {
      if (prev.some((item) => item.id === member.id)) {
        return prev.filter((item) => item.id !== member.id);
      }
      return [...prev, member];
    });
  }, []);

  const handleRemoveTag = (memberId: number | string) => {
    setSelectedMember((prevMembers) =>
      prevMembers.filter((tag) => tag.id !== memberId)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between">
        <h2 className=" font-Inter font-bold text-xl">Add New User</h2>
        <Button
          onClick={() => setOpen(false)}
          variant="ghost"
          className="text-text hover:cursor-pointer hover:bg-transparent"
        >
          <X />
        </Button>
      </div>

      <form className="mt-3 text-[#494A4BFF] space-y-6 ">
        {/*----------- full Name --------- */}
        <div className=" flex flex-col gap-2">
          <label className=" font-Inter font-semibold" htmlFor="name">
            Name
          </label>
          <Input
            type="text"
            placeholder="Full Name"
            className=" border-2 rounded !border-gray-300"
          />
        </div>

        {/*----------------- Email address-------------- */}

        <div className=" flex flex-col gap-2">
          <label className=" font-Inter font-semibold" htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            placeholder="Email address"
            className=" border-2 rounded !border-gray-300"
          />
        </div>

        {/*--------------- Team members ------------- */}

        <div className=" flex flex-col gap-2">
          <label className=" font-Inter font-semibold" htmlFor="members">
            Team Members
          </label>
          <div>
            {selectedMember.map((member) => (
              <div key={member.id} className="relative inline-block m-1 group">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${member.color} relative`}
                >
                  {member.name}
                  <CgClose
                    className="absolute -top-2  text-lg text-black cursor-pointer 
                              opacity-0 group-hover:opacity-100 transition-opacity
                              bg-white rounded-full p-0.5 shadow-sm"
                    onClick={() => handleRemoveTag(member.id)}
                  />
                </span>
              </div>
            ))}
          </div>
          <Popover open={openMember} onOpenChange={setOpenMember}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className=" text-text hover:bg-gray-300  flex gap-2"
              >
               Add Member
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <motion.div
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
                className=" grid grid-cols-5 gap-2 "
              >
                {teamMembersData.map((member) => (
                  <Button
                    key={member.id}
                    variant="outline"
                    disabled={selectedMember.some((t) => t.id === member.id)}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectMember(member);
                    }}
                  >
                    {member.name}
                  </Button>
                ))}
              </motion.div>
            </PopoverContent>
          </Popover>
        </div>

        {/*-------------------- Priority ------------------- */}
        <div className=" flex flex-col gap-2">
          <label className=" font-Inter font-semibold" htmlFor="priority">
            Priority
          </label>
          <Select>
            <SelectTrigger className="w-full rounded border-2 hover:cursor-pointer">
              <SelectValue placeholder="0-5" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className=" flex justify-end gap-4 mt-8">
          <Button
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
            }}
            className=" hover:cursor-pointer bg-[#F8F9FAFF] text-text hover:bg-[#dfecfa]"
          >
            Cancel
          </Button>
          <Button className="hover:cursor-pointer bg-lightBtn hover:bg-darkBlueBtn">
            Create User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
