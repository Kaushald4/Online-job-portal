import { useTheme } from "flowbite-react";
import React, { useState } from "react";
import { useThemeMode } from "../context/themeContext";

interface Props {
  children?: any;
  tabsTitle: string[];
}

const TabView = ({ children, tabsTitle, ...otherProps }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const { isDarkMode } = useThemeMode();

  return (
    <div>
      <div className="flex items-center overflow-hidden dark:bg-gray-700 bg-gray-100 rounded">
        {tabsTitle.map((tab, i) => {
          let bgColor;
          if (activeTab === i) {
            // active tab style
            if (isDarkMode) {
              // active tab style in dark mode
              bgColor = "#1f2937";
            } else {
              // active tab style in light mode
              bgColor = "#d7d7d7";
            }
          } else {
            // non active tab style
            if (isDarkMode) {
              // non active tab style in dark mode
              bgColor = "#374151";
            } else {
              // non active tab style in light mode
              bgColor = "#e4e4e4";
            }
          }
          return (
            <div
              onClick={() => setActiveTab(i)}
              style={{
                backgroundColor: bgColor,
              }}
              key={i}
              className="cursor-pointer py-5 px-[50px] hover:dark:bg-gray-800 transition-all duration-150"
            >
              <h1 className="dark:text-white">{tab}</h1>
            </div>
          );
        })}
      </div>
      <div className="mt-2">{children[activeTab]}</div>
    </div>
  );
};

export default TabView;
