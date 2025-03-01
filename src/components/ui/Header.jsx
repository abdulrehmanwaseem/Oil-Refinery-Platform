import { faCircleQuestion, faCopy } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import "../../utils/fontawesome";
import { Button } from "./common/Button";
import { Dropdown } from "./common/Dropdown";
import { IconButton } from "./common/IconButton";
import { UserProfile } from "./common/UserProfile";

const NAVIGATION_ITEMS = [
  { icon: "house", ariaLabel: "Home" },
  { icon: "filter", ariaLabel: "Filter" },
  { icon: "briefcase-clock", ariaLabel: "Schedule" },
  { icon: "screwdriver-wrench", ariaLabel: "Tools" },
  { icon: "gear", ariaLabel: "Settings" },
];

export function Header() {
  const [isSiteOpen, setIsSiteOpen] = useState(false);
  const [isAreaOpen, setIsAreaOpen] = useState(false);

  return (
    <header className="absolute z-10 flex flex-wrap items-center justify-between top-3 inset-x-4">
      <NavBar />
      <ActionButtons />
      <Dropdown
        label="SITE"
        value="ISDAR PLATFORM"
        isOpen={isSiteOpen}
        setIsOpen={setIsSiteOpen}
        options={[{ label: "Platform 1" }, { label: "Platform 2" }]}
      />
      <Dropdown
        label="AREA"
        value="ALL"
        isOpen={isAreaOpen}
        setIsOpen={setIsAreaOpen}
        options={[{ label: "Area 1" }, { label: "Area 2" }]}
      />
      <UserNavigation />
    </header>
  );
}

function NavBar() {
  return (
    <div className="flex shadow-md items-center justify-between px-4 py-1.5 rounded-lg w-96 bg-white/95 hover:bg-gray-100">
      <div className="flex items-center -mr-2">
        <img src="/logo.png" alt="Logo" className="cursor-pointer" />
        <div className="w-px h-6 ml-4 bg-gray-300" />
      </div>
      {NAVIGATION_ITEMS.map((item) => (
        <IconButton
          key={item.icon}
          icon={item.icon}
          ariaLabel={item.ariaLabel}
        />
      ))}
    </div>
  );
}

function ActionButtons() {
  return (
    <>
      <Button variant="primary" icon={faCopy} label="Overview" />
      <Button variant="secondary" icon="rotate" label="Process Area" />
      <Button variant="secondary" icon="th-large" label="System" />
    </>
  );
}

function UserNavigation() {
  return (
    <div className="flex items-center justify-between gap-10 px-4 py-1 text-sm rounded-lg shadow-md bg-white/95 hover:bg-gray-100">
      <div className="flex items-center gap-4">
        <IconButton icon={faCircleQuestion} ariaLabel="Help" />
        <IconButton icon="circle-plus" ariaLabel="Add" />
        <IconButton icon="search" ariaLabel="Search" />
      </div>
      <UserProfile name="Karl Jacob" />
    </div>
  );
}
