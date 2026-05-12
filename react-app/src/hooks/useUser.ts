import { useState } from "react";
import type { LoadingStatus } from "./types/LoadingType";
const STATUS_TEXT: Record<LoadingStatus, string> = {
  idle: "Submit",
  loading: "Loading...",
  success: "Completed",
};
function useUser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<LoadingStatus>("idle");
  const [error, setError] = useState("");

  const updateData = async () => {
    try {
      setLoading("loading");
      const response = await fetch(`https://jsonplaceholder.typicode.com/users`);

      if (!response.ok) {
        throw new Error("API ERROR");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      const err = error as Error;
      setError(err.message);
    } finally {
      setLoading("success");
    }
  };

  const disabled = loading === "loading" ? true : false;
  const statusText = STATUS_TEXT[loading];
  return {
    data,
    loading,
    error,
    updateData,
    disabled,
    statusText,
  };
}

export default useUser;
