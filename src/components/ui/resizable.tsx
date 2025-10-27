// Deprecated: simple resizable stubs to avoid depending on react-resizable-panels.
import * as React from "react";

export const ResizablePanelGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={className} {...props} />
);
export const ResizablePanel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={className} {...props} />
);
export const ResizableHandle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={className} {...props} />
);
