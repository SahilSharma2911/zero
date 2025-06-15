import { useAppContext } from "@/Context/AppContext";
import { TagTypeProps } from "@/types/type";
import axios from "axios";
import { useEffect, useState } from "react";


const useGetTags = () => {
  const [allTags, setAllTags] = useState<TagTypeProps[]>([]);

  const { cookieData } = useAppContext();

  
  useEffect(() => {
    const fetchTags = async () => {
    try {
      const response = await axios.get(
        `https://task-management-backend-kohl-omega.vercel.app/api/tags/get-tags/${cookieData.id}`
      );

      if (response.status === 200) {
        setAllTags(response.data?.data);
      }
    } catch (error) {
      console.log("error occur in fetching tags", error);
    }
  };

    fetchTags();
  }, [cookieData.id]);

  console.log("allTags is here",allTags)

  return {
    allTags
  };
};

export default useGetTags;
