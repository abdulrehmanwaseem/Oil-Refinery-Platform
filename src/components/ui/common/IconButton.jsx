import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export function IconButton({
  icon,
  ariaLabel,
  onClick,
  size = "5",
  className = "",
}) {
  return (
    <FontAwesomeIcon
      icon={icon}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`cursor-pointer text-neutral-600 size-${size} ${className}`}
    />
  );
}
