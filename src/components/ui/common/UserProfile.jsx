import React from "react";

export function UserProfile({
  name,
  avatarUrl = "https://avatar.iran.liara.run/public",
  className = "",
}) {
  return (
    <div className={`flex items-center gap-2 ml-auto ${className}`}>
      <div className="overflow-hidden bg-gray-200 rounded-full w-7 h-7">
        <img
          src={avatarUrl}
          alt="User avatar"
          className="object-cover w-full h-full cursor-pointer"
        />
      </div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
}
