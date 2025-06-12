import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import useFormData from "../hooks/useFormData";

const DueDate = () => {

    //---------------custom hook -------------------
  const { dueDateData } = useFormData();

  const date = dueDateData?.date;
  const handleDateSelect = dueDateData?.handleDateSelect;

  return (
    <div className="mt-4 text-text">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 pl-0">
            <CalendarIcon size={16} />
            {date ? format(date, "PPP") : "Due Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DueDate;
