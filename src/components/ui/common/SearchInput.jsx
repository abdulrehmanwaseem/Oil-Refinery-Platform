import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SearchInput({ placeholder, value, onChange, className = "" }) {
  return (
    <div className={`relative mt-4 mb-3 ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 text-sm bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <FontAwesomeIcon
        icon="chevron-down"
        className="absolute h-6 text-neutral-600 size-4 right-3 top-2"
      />
    </div>
  );
}
