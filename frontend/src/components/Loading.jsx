import React from 'react';

const Loading = ({ height = "h-screen" }) => {
  return (
    <div className={`flex justify-center items-center ${height}`}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
};

export default Loading;