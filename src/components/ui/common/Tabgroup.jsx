import React from "react";

export function TabGroup({
  tabs = [],
  activeTab,
  onTabChange,
  className = "",
}) {
  return (
    <div className={`flex flex-shrink-0 border-b border-gray-200 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`flex-1 py-2 text-sm font-semibold text-center uppercase transition-colors duration-200 ${
            activeTab === tab
              ? "border-b-2 border-blue-600 text-black"
              : "text-gray-500 hover:text-black"
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
