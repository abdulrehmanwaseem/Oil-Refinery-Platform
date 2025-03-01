import React, { useRef, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDragScroll } from "../../hooks/useDragScroll";
import { TabGroup } from "./common/TabGroup";

export function RightSidebar({ selectedAsset, assetsDetails = {} }) {
  const [activeTab, setActiveTab] = useState("details");
  const contentRef = useRef(null);
  const { onMouseDown } = useDragScroll(contentRef);

  const details = useMemo(() => {
    return assetsDetails[selectedAsset] || assetsDetails["Main_Deck"];
  }, [selectedAsset, assetsDetails]);

  const headerDetails = useMemo(() => {
    if (!details || details.length === 0)
      return { type: "Unknown", model: "Unknown" };

    const typeDetail = details.find((item) => item.label === "Asset Name");
    const modelDetail = details.find((item) => item.label === "Asset ID");

    return {
      type: typeDetail ? typeDetail.value : "Unknown",
      model: modelDetail ? modelDetail.value : "Unknown",
    };
  }, [details]);

  const tabs = ["details", "docs", "orders", "permits"];

  return (
    <aside className="absolute z-10 flex flex-col p-4 overflow-hidden bg-white rounded-lg shadow-md top-20 bottom-10 right-4 w-80">
      <SidebarHeader
        title={headerDetails.model}
        subtitle={headerDetails.type}
      />
      <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <TabContent
        activeTab={activeTab}
        details={details}
        contentRef={contentRef}
        onMouseDown={onMouseDown}
      />
    </aside>
  );
}

function SidebarHeader({ title, subtitle }) {
  return (
    <div className="flex items-center justify-between flex-shrink-0 mb-2">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <button className="flex-shrink-0 px-2 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
        <FontAwesomeIcon icon="arrow-rotate-right" className="size-3.5" />
        <span>Refresh</span>
      </button>
    </div>
  );
}

function TabContent({ activeTab, details, contentRef, onMouseDown }) {
  return (
    <div
      ref={contentRef}
      onMouseDown={onMouseDown}
      className="flex-1 mt-4 overflow-hidden cursor-grab no-scrollbar"
    >
      {activeTab === "details" ? (
        <DetailsList details={details} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

function DetailsList({ details }) {
  if (!details || details.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul className="space-y-2">
      {details.map((item, index) => (
        <li key={index} className="py-2 border-b border-gray-200">
          <span className="block text-xs font-semibold text-gray-800">
            {item.label}
          </span>
          <span className="block mt-1 text-xs text-gray-600">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}

function EmptyState() {
  return (
    <div className="flex items-center justify-center h-full text-sm text-gray-500">
      No Data Available
    </div>
  );
}
