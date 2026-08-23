import React from "react";
import { Loader2Icon } from "lucide-react";

const Loading = () => {
  return (
    <Loader2Icon
      className="h-6 w-6 animate-spin text-blue-500"
      aria-label="Loading"
    />
  );
};

export default Loading;