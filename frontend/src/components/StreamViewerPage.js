import React from "react";
import BroadcastPage from "./BroadcastPage";
import WebSocketComponent from "./WebSocket";

function StreamViewerPage({ streamDetails }) {
    return (
        <div>
            <h2>Stream Viewer</h2>
            <BroadcastPage streamDetails={streamDetails} />
            <WebSocketComponent />
        </div>
    );
}

export default StreamViewerPage;