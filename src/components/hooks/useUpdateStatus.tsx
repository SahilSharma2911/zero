import { useAppContext } from "@/Context/AppContext";
import { TaskProps } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useUpdateStatus = () => {
  const [allTasks, setAllTasks] = useState<TaskProps[]>([]); // Initialize with proper type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { cookieData } = useAppContext();


    const updateStatus = async (e: React.MouseEvent<HTMLButtonElement> ,taskId:string,status:string) => {
        e.stopPropagation()
      // Check if we have the required data
      if (!cookieData?.id || !cookieData?.role) {
        setLoading(false);
        return;
      }

      const loadingId = toast.loading("Fetching tasks...")

      try {
        setLoading(true);
        const roleParam = cookieData.role === "Admin" ? "adminId" : "userId";
        const response = await axios.get(
          `https://task-management-backend-kohl-omega.vercel.app/update-task/${taskId}`
        );

        console.log("response is here",response)

        // Adjust based on your actual API response structure
        const tasks = response.data.data || response.data || [];
        setAllTasks(tasks);
        toast.success("Tasks Fetched",{id:loadingId})
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks");
        toast.error("Failed to fetch tasks",{id:loadingId})
      } finally {
        setLoading(false);
      }
    };




  return {
    updateStatus
  };
};

export default useUpdateStatus;