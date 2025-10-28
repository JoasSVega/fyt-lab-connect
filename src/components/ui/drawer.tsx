// Deprecated: lightweight drawer stubs to avoid depending on vaul.
import * as React from "react";

export const Drawer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);
export const DrawerTrigger: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button type="button" {...props}>{children}</button>
);
export const DrawerPortal: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);
export const DrawerClose: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button type="button" {...props}>{children}</button>
);
export const DrawerOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={className} {...props} />,
);
export const DrawerContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>{children}</div>
  ),
);
export const DrawerHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={className} {...props} />
);
export const DrawerFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={className} {...props} />
);
export const DrawerTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={className} {...props} />,
);
export const DrawerDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={className} {...props} />,
);
