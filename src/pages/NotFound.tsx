import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center">
        <h1 className="font-mono text-2xl font-medium text-foreground mb-3">404</h1>
        <p className="text-sm text-muted-foreground mb-4">Page not found</p>
        <a href="/" className="text-sm text-primary hover:underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
