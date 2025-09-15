import React from "react";
import Navbar from "./Navbar";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-white">
    <Navbar />
    <div className="flex-1 w-full">
      {children}
    </div>
  {/* Footer eliminado para evitar duplicado, ya está en App.tsx */}
  </div>
);

export default BaseLayout;
