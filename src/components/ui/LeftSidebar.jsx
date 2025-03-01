import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDragScroll } from "../../hooks/useDragScroll";
import { SearchInput } from "./common/SearchInput";

export function LeftSidebar({ selectedAsset, setSelectedAsset, assets = [] }) {
  const containerRef = useRef(null);
  const { onMouseDown } = useDragScroll(containerRef);

  return (
    <aside className="absolute z-10 p-4 overflow-hidden bg-white rounded-lg shadow-md left-4 bottom-10 top-20 w-80">
      <SidebarHeader title="Assets" />
      <SearchInput placeholder="Search Id" />
      <AssetListHeader />
      <AssetList
        assets={assets}
        selectedAsset={selectedAsset}
        setSelectedAsset={setSelectedAsset}
        containerRef={containerRef}
        onMouseDown={onMouseDown}
      />
    </aside>
  );
}

function SidebarHeader({ title }) {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold">{title}</h2>
      <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800">
        <FontAwesomeIcon icon="arrow-rotate-right" className="size-3.5" />
        <span>Refresh</span>
      </button>
    </div>
  );
}

function AssetListHeader() {
  return (
    <>
      <div className="grid grid-cols-3 px-3 py-2 text-xs font-semibold text-gray-500">
        <span className="text-left">Status</span>
        <span>Name</span>
        <span className="text-right">Score</span>
      </div>
      <hr className="h-[1.5px] bg-neutral-300 border-0" />
    </>
  );
}

function AssetList({
  assets,
  selectedAsset,
  setSelectedAsset,
  containerRef,
  onMouseDown,
}) {
  const getStatusColor = (status) => {
    const colors = {
      red: "bg-red-500",
      yellow: "bg-yellow-400",
      default: "bg-gray-300",
    };
    return colors[status] || colors.default;
  };

  return (
    <ul
      ref={containerRef}
      onMouseDown={onMouseDown}
      className="space-y-2 overflow-hidden cursor-grab no-scrollbar"
      style={{ maxHeight: "calc(100% - 150px)" }}
    >
      {assets?.map((asset, index) => (
        <AssetItem
          key={index}
          asset={asset}
          isSelected={selectedAsset === asset.name.replace(/ /g, "_")}
          onClick={() => setSelectedAsset(asset.name.replace(/ /g, "_"))}
          getStatusColor={getStatusColor}
        />
      ))}
    </ul>
  );
}

function AssetItem({ asset, isSelected, onClick, getStatusColor }) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer ${
        isSelected ? "bg-blue-50 border-l-4 border-blue-600" : ""
      }`}
    >
      <span
        className={`inline-block w-3 h-3 rounded-sm ${getStatusColor(
          asset.status
        )}`}
      ></span>
      <span className="flex-1 ml-16 text-md">{asset.name}</span>
      <span className="text-sm font-semibold">{asset.score}</span>
    </li>
  );
}
