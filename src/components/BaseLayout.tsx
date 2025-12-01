import React from "react";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => (
  <div className="flex flex-col w-full bg-white">
    {children}
  </div>
);

export default BaseLayout;
