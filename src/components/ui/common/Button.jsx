import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Button({
  variant = "secondary",
  icon,
  label,
  onClick,
  className = "",
}) {
  const variants = {
    primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-100",
  };

  const baseClasses =
    "shadow-md flex items-center focus:ring-4 font-medium rounded-lg text-sm px-4 py-2";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-2 size-4" />}
      {label}
    </button>
  );
}
