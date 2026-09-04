import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { capturePageView } from "@/lib/analytics";

const AnalyticsPageView = () => {
  const location = useLocation();

  useEffect(() => {
    capturePageView();
  }, [location.pathname, location.search]);

  return null;
};

export default AnalyticsPageView;
