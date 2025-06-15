import { useAppContext } from "@/Context/AppContext";
import { TaskProps } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetTasks = () => {
  const [allTasks, setAllTasks] = useState<TaskProps[]>([]); // Initialize with proper type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { cookieData } = useAppContext();


  useEffect(() => {
    const fetchTasks = async () => {
      // Check if we have the required data
      if (!cookieData?.id || !cookieData?.role) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const roleParam = cookieData.role === "Admin" ? "adminId" : "userId";
        const response = await axios.get(
          `https://task-management-backend-kohl-omega.vercel.app/api/tasks/get-tasks?${roleParam}=${cookieData.id}`
        );

        console.log("response is here",response)

        // Adjust based on your actual API response structure
        const tasks = response.data.data || response.data || [];
        setAllTasks(tasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [cookieData]); // Only depend on cookieData

  return {
    allTasks,
    loading,
    error
  };
};

export default useGetTasks;