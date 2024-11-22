"use client";

import { Children, useState } from "react";

interface TabsProps {
  children: React.ReactElement[];
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b">
        {Children.map(children, (child, index) => (
          <button
            className={`py-2 px-4 ${
              activeTab === index ? "border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {child.props.label}
          </button>
        ))}
      </div>

      <div className="p-4">{Children.toArray(children)[activeTab]}</div>
    </div>
  );
};

export const Tab: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => {
  return <div>{children}</div>;
};
