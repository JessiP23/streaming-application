import React from "react";
import StreamerSecretCodeForm from "./StreamerSecretCodeForm";
import StreamTransferForm from "./StreamTransferForm";

function StreamViewerPage({ streamDetails }) {
    return (
        <div>
            <h2>Stream Viewer</h2>
            <StreamerSecretCodeForm />
            <StreamTransferForm />
        </div>
    );
}

export default StreamViewerPage;
