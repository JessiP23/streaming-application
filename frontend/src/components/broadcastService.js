import React, { useEffect } from "react";
import WebSocketComponent from "./WebSocket";
import InitBroadcast from "./BroadcastPage";

function BroadcastPage({ streamDetails }) {
  useEffect(() => {
    // Check if initBroadcast function exists before calling it
    if (typeof initBroadcast === 'function') {
      InitBroadcast(streamDetails);
    } else {
      console.error('initBroadcast function is not defined.');
    }
  }, [streamDetails]);

  return (
    <div>
      <h2>Live Broadcast</h2>
      <div id="twitch-embed"></div>
      <WebSocketComponent />
    </div>
  );
}

export default BroadcastPage;
