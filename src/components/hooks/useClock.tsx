// hooks/useClockInOut.ts
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppContext } from "@/Context/AppContext";

interface WorkSession {
  id: string;
  userId: string;
  clockInTime: string;
  clockOutTime?: string;
  TotalTime: number;
  Date: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface ClockInOutState {
  isClocked: boolean;
  currentSession: WorkSession | null;
  loading: boolean;
}

export const useClockInOut = () => {
  const { cookieData } = useAppContext();
  const [state, setState] = useState<ClockInOutState>({
    isClocked: false,
    currentSession: null,
    loading: false,
  });

  const baseURL =
    "https://task-management-backend-kohl-omega.vercel.app/api/worksession";

  // Check if user has an active session on component mount
  const checkActiveSession = useCallback(async () => {
    if (!cookieData?.id || cookieData?.role !== "User") {
      return;
    }

    try {
      setState((prev) => ({ ...prev, loading: true }));

      // You'll need to create this endpoint to get active session
      const response = await axios.get(`${baseURL}/active/${cookieData.id}`);

      if (response.data.data) {
        setState((prev) => ({
          ...prev,
          isClocked: true,
          currentSession: response.data.data,
          loading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          isClocked: false,
          currentSession: null,
          loading: false,
        }));
      }
    } catch (error: any) {
      // If no active session found, that's okay
      if (error.response?.status === 404) {
        setState((prev) => ({
          ...prev,
          isClocked: false,
          currentSession: null,
          loading: false,
        }));
      } else {
        console.error("Error checking active session:", error);
        setState((prev) => ({ ...prev, loading: false }));
      }
    }
  }, [cookieData, baseURL]);

  // Clock In function
  const clockIn = async () => {
    if (!cookieData?.id || cookieData?.role !== "User") {
      toast.error("Only users can clock in/out");
      return;
    }

    const toastId = toast.loading("Clocking in...");

    try {
      setState((prev) => ({ ...prev, loading: true }));

      const response = await axios.post(`${baseURL}/clock-in`, {
        userId: cookieData.id,
      });

      const newSession = response.data.data;

      setState((prev) => ({
        ...prev,
        isClocked: true,
        currentSession: newSession,
        loading: false,
      }));

      toast.success("Clocked in successfully!", { id: toastId });
    } catch (error: any) {
      console.error("Error clocking in:", error);
      let errorMessage = "Failed to clock in";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage, { id: toastId });
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Clock Out function
  const clockOut = async () => {
    if (
      !cookieData?.id ||
      cookieData?.role !== "User" ||
      !state.currentSession
    ) {
      toast.error("No active session to clock out");
      return;
    }

    const toastId = toast.loading("Clocking out...");

    try {
      setState((prev) => ({ ...prev, loading: true }));

      const response = await axios.put(
        `${baseURL}/clock-out/${state.currentSession.id}`,
        {
          userId: cookieData.id,
        }
      );

      const updatedSession = response.data.data;

      setState((prev) => ({
        ...prev,
        isClocked: false,
        currentSession: null,
        loading: false,
      }));

      // Show formatted time in success message
      const totalTimeFormatted = response.data.data.totalTimeFormatted;
      toast.success(
        `Clocked out successfully! Total time: ${totalTimeFormatted}`,
        {
          id: toastId,
          duration: 5000,
        }
      );
    } catch (error: any) {
      console.error("Error clocking out:", error);
      let errorMessage = "Failed to clock out";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast.error(errorMessage, { id: toastId });
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Toggle function for the button
  const toggleClock = () => {
    if (state.isClocked) {
      clockOut();
    } else {
      clockIn();
    }
  };

  // Format current session time (for display) - now includes seconds
  const getCurrentSessionTime = useCallback(() => {
    if (!state.currentSession?.clockInTime) return "00:00:00";

    const clockIn = new Date(state.currentSession.clockInTime);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - clockIn.getTime()) / 1000
    );

    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [state.currentSession]);

  // Auto-refresh current time every second (changed from every minute)
  useEffect(() => {
    if (!state.isClocked) return;

    const interval = setInterval(() => {
      // This will trigger a re-render to update the displayed time
      setState((prev) => ({ ...prev }));
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [state.isClocked]);

  // Check for active session on mount
  useEffect(() => {
    checkActiveSession();
  }, [checkActiveSession]);

  return {
    ...state,
    toggleClock,
    clockIn,
    clockOut,
    getCurrentSessionTime,
    canUseClock: cookieData?.role === "User",
  };
};
