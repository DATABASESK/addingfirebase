"use client"; // This can still be marked as "use client" if you need it for a client-side render

import { Analytics } from '@vercel/analytics/react'; 

const AnalyticsWrapper = () => {
  return <Analytics />;
};

export default AnalyticsWrapper;
