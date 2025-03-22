import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      <p className="ml-3 text-lg text-gray-700">Loading...</p>
    </div>
  );
};

export default Loading;
