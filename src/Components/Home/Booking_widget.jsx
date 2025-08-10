// components/Booking_widget.jsx
import React, { useEffect, useRef } from 'react';

const Booking_widget = () => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const scriptId = 'calendly-script';

    // Avoid loading the script multiple times
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      ref={widgetRef}
      className="calendly-inline-widget"
      data-url="https://calendly.com/ai-arviso/30min?hide_event_type_details=1&hide_gdpr_banner=1"
      style={{ minWidth: '620px', height: '500px' }}
    />
  );
};

export default Booking_widget;
