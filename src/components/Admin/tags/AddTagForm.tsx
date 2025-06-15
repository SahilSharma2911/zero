/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { HexColorPicker } from "react-colorful";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAppContext } from "@/Context/AppContext";

type TagFormValues = {
  name: string;
  color: string;
};

const AddTagForm = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#E89623");

  const { cookieData } = useAppContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TagFormValues>({
    defaultValues: {
      name: "",
      color: "#E89623",
    },
  });

  const onSubmit = async (data: TagFormValues) => {
    const toastId = toast.loading("Logging in...");

    try {
      const response = await axios.post(
        "https://task-management-backend-kohl-omega.vercel.app/api/tags/create-tag",
        {
          name: data.name,
          color: data.color,
          createdBy: cookieData?.id,
        }
      );

      console.log("response of tag create",response)

      toast.success("Login successful!", { id: toastId });
      setOpen(false);
    } catch (error: any) {
      console.error("Error creating tag:", error);
      toast.error(error.response?.data?.message || "Failed to create tag");
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setValue("color", color);
    setShowPicker(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between">
        <h2 className="font-Inter font-bold text-xl">Add New Tag</h2>
        <Button
          onClick={() => setOpen(false)}
          variant="ghost"
          className="text-text hover:cursor-pointer hover:bg-transparent"
        >
          <X />
        </Button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-3 text-[#494A4BFF] space-y-6"
      >
        {/* Name Field */}
        <div className="flex flex-col gap-2">
          <label className="font-Inter font-semibold" htmlFor="name">
            Name
          </label>
          <Input
            {...register("name", {
              required: "Tag name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            placeholder="Tag Name"
            className={`border-2 rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        {/* Color Selection */}
        <div className="space-y-4">
          <label className="font-Inter font-semibold">Color</label>

          <div className="flex items-center gap-4">
            {/* Selected Color Preview */}
            <div
              className="w-16 h-16 rounded-md border"
              style={{ backgroundColor: selectedColor }}
            />

            {/* Color Picker Popover */}
            <Popover open={showPicker} onOpenChange={setShowPicker}>
              <PopoverTrigger asChild>
                <Button variant="outline" type="button">
                  Select Color
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4 space-y-4">
                <HexColorPicker
                  color={selectedColor}
                  onChange={(color) => setSelectedColor(color)}
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <span className="font-mono text-sm">{selectedColor}</span>
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleColorSelect(selectedColor)}
                  >
                    Confirm Color
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <input type="hidden" {...register("color")} />
          {errors.color && (
            <span className="text-red-500 text-sm">{errors.color.message}</span>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            type="button"
            onClick={() => setOpen(false)}
            className="hover:cursor-pointer bg-[#F8F9FAFF] text-text hover:bg-[#dfecfa]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="hover:cursor-pointer bg-lightBtn hover:bg-darkBlueBtn"
          >
            {isSubmitting ? "Creating..." : "Create Tag"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTagForm;
