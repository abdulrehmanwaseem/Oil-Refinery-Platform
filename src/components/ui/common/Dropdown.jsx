import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Dropdown({
  label,
  value,
  isOpen,
  setIsOpen,
  options = [],
  className = "",
}) {
  return (
    <div className={`relative shadow-md ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white rounded-md px-4 py-1.5 flex items-center gap-6 text-sm hover:bg-gray-100"
      >
        <span className="text-xs font-bold">{label}</span>
        <span>{value}</span>
        <FontAwesomeIcon
          icon="chevron-down"
          className="h-6 text-neutral-600 size-4"
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 z-20 py-1 mt-1 bg-white rounded-md shadow-lg"
          style={{ width: "max-content", minWidth: "100%" }}
        >
          {options.map((option, index) => (
            <a
              key={index}
              href="#"
              className="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              {option.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
