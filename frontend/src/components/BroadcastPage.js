import React, {useEffect} from "react";
import BroadcastPage from './broadcastService';
import WebSocketComponent from "./WebSocket";

function InitBroadcast({ streamDetails }) {
    useEffect(() => {
        BroadcastPage(streamDetails);
    }, [streamDetails]);

    return (
        <div>
            <h2>Live Broadcast</h2>
            <div id="twitch-embed"></div>
            <WebSocketComponent />
        </div>
    );
}

export default InitBroadcast;