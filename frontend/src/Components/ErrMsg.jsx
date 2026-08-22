import React from "react";

const ErrMsg = ({ msg }) => {
  if (msg) {
    return (
      <div className="flex items-center gap-2 mt-1 ml-1 animate-fadeIn">
        <svg
          className="w-3.5 h-3.5 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-[11px] font-semibold text-red-500 uppercase tracking-wider italic">
          {msg}
        </p>
      </div>
    );
  }
  return null;
};

export default ErrMsg;
