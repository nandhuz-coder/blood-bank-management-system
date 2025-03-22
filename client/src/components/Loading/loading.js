import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div
        className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"
        role="status"
        aria-label="Loading"
      ></div>
      <p className="mt-3 text-lg font-medium text-gray-700">Please wait...</p>
    </div>
  );
};

export default Loading;
