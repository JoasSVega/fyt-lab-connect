import React from "react";
import { Button } from "./ui/button";
import { useTransition } from "@/providers/TransitionProvider";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

const Fallback: React.FC<{ title: string; message: string; onRetry: () => void }> = ({ title, message, onRetry }) => {
  // Ensure transitions do not get stuck if an error happens before page ready
  const { signalPageReady } = useTransition();
  React.useEffect(() => {
    // Defer a tick to respect initial loader timings
    const id = requestAnimationFrame(() => signalPageReady());
    return () => cancelAnimationFrame(id);
  }, [signalPageReady]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <div className="max-w-md w-full bg-white text-slate-900 border-2 border-fyt-blue/30 rounded-xl shadow-soft p-6 text-center">
        <h2 className="text-xl font-semibold mb-2 text-fyt-blue">{title}</h2>
        <p className="text-sm text-slate-600 mb-4">{message}</p>
        <Button variant="outline" onClick={onRetry} className="border-fyt-blue text-fyt-blue hover:bg-fyt-blue hover:text-white">
          Reintentar
        </Button>
      </div>
    </div>
  );
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log cleanly for diagnostics without spamming the console
    // eslint-disable-next-line no-console
    console.error("UI ErrorBoundary:", { error, errorInfo });
  }

  handleRetry = () => {
    // Reset boundary state; simplest approach is full reload to recover safely
    // without impacting internal app state integrity.
    if (typeof window !== "undefined" && window.location) {
      window.location.reload();
    } else {
      this.setState({ hasError: false, error: undefined });
    }
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <Fallback
          title={this.props.fallbackTitle || "Algo no salió como esperábamos"}
          message={this.props.fallbackMessage || "Hemos encontrado un problema al cargar esta sección. Puedes reintentar mientras mantenemos la navegación estable."}
          onRetry={this.handleRetry}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
