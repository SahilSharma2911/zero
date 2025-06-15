import { useAppContext } from "@/Context/AppContext";
import { TaskProps } from "@/types/type";
import axios, { CancelTokenSource } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetTasks = () => {
  const [allTasks, setAllTasks] = useState<TaskProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { cookieData } = useAppContext();

  useEffect(() => {
    let cancelTokenSource: CancelTokenSource | null = null;

    const fetchTasks = async () => {
      // Validate required data
      if (!cookieData?.id || !cookieData?.role) {
        setLoading(false);
        return;
      }

      // Create cancellation token
      cancelTokenSource = axios.CancelToken.source();
      const loadingId = toast.loading("Fetching tasks...");

      try {
        setLoading(true);
        setError(null);

        const roleParam = cookieData.role === "Admin" ? "adminId" : "userId";
        const response = await axios.get(
          `https://task-management-backend-kohl-omega.vercel.app/api/tasks/get-tasks`,
          {
            params: {
              [roleParam]: cookieData.id
            },
            cancelToken: cancelTokenSource.token,
            timeout: 10000 // 10 second timeout
          }
        );

        // Validate response structure
        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error("Invalid response structure");
        }

        setAllTasks(response.data.data);
        toast.success("Tasks loaded successfully", { id: loadingId });
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          console.error("Error fetching tasks:", err);
          const errorMessage = (err instanceof Error && err.message) ? err.message : "Failed to fetch tasks";
          setError(errorMessage);
          toast.error("Failed to fetch tasks. Please try again.", { id: loadingId });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    // Cleanup function to cancel request if component unmounts
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel("Component unmounted, request canceled");
      }
    };
  }, [cookieData?.id, cookieData?.role]); // Only re-run if these values change

  // Memoize the returned object to prevent unnecessary re-renders
  return {
    allTasks,
    loading,
    error,
    isEmpty: allTasks.length === 0 && !loading
  };
};

export default useGetTasks;