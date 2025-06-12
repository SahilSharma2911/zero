"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tags } from "lucide-react";
import { CgClose } from "react-icons/cg";
import { motion } from "framer-motion";
import useFormData from "../hooks/useFormData";

const popupVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const Tag = () => {

    //--------custom hook---------
  const { tagsData } = useFormData();

  const selectedTags = tagsData?.selectedTags;
  const handleRemoveTag = tagsData?.handleRemoveTag;
  const openTag = tagsData?.openTag;
  const setOpenTag = tagsData?.setOpenTag;
  const availableTags = tagsData?.availableTags;
  const handleTagSelect = tagsData?.handleTagSelect;

  return (
    <div className="flex gap-2 items-center flex-wrap ">
      {/* Selected Tags */}
      {selectedTags.map((tag) => (
        <div key={tag.id} className="relative inline-block m-1 group">
          <span
            className={`px-3 py-1 rounded-full text-xs ${tag.color} relative`}
          >
            {tag.name}
            <CgClose
              className="absolute -top-2  text-lg text-black cursor-pointer 
                  opacity-0 group-hover:opacity-100 transition-opacity
                  bg-white rounded-full p-0.5 shadow-sm"
              onClick={() => handleRemoveTag(tag.id)}
            />
          </span>
        </div>
      ))}

      {/* Tag Selector */}
      <Popover open={openTag} onOpenChange={setOpenTag}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="bg-gray-200 text-text hover:bg-gray-300 flex gap-2"
          >
            <Tags size={16} />
            Tags
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="flex gap-2 "
          >
            {availableTags.map((tag) => (
              <Button
                key={tag.id}
                variant="outline"
                disabled={selectedTags.some((t) => t.id === tag.id)}
                onClick={(e) => {
                  e.preventDefault();
                  handleTagSelect(tag);
                }}
              >
                {tag.name}
              </Button>
            ))}
          </motion.div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Tag;
