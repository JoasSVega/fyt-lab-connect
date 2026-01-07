// Deprecated: simple OTP input stubs to avoid depending on input-otp.
import * as React from "react";

export const InputOTP = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={className} inputMode="numeric" {...props} />,
);
InputOTP.displayName = "InputOTP";

export const InputOTPGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={className} {...props} />,
);
InputOTPGroup.displayName = "InputOTPGroup";

export const InputOTPSlot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={className} {...props} />,
);
InputOTPSlot.displayName = "InputOTPSlot";

export const InputOTPSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => <div ref={ref} role="separator" {...props} />,
);
InputOTPSeparator.displayName = "InputOTPSeparator";
