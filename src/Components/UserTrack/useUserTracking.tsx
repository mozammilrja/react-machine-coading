import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const useUserTracking = () => {
  useEffect(() => {
    let userId = localStorage.getItem("userId");
    let userCount: any = localStorage.getItem("userCount");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
      userCount = String((parseInt(userCount) || 0) + 1);
      localStorage.setItem("userCount", userCount);
    } else if (!userCount) {
      userCount = "1";
      localStorage.setItem("userCount", userCount);
    }
  }, []);

  const userId = localStorage.getItem("userId") || "";
  const userCount = localStorage.getItem("userCount") || "0";
  return { userId, userCount };
};

export default useUserTracking;
