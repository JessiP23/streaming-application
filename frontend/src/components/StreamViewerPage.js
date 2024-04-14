import React from "react";
import BroadcastPage from "./BroadcastPage";
import { Routes, Route } from 'react-router-dom';
import StreamerSecretCodeForm from "./StreamerSecretCodeForm";
import StreamTransferForm from "./StreamTransferForm";
function StreamViewerPage() {
    return (
        <div>
            <h2>Stream Viewer</h2>
            <StreamerSecretCodeForm />
            <StreamTransferForm />
            <Routes>
                <Route path="/stream-viewer/:streamDetails" element={<BroadcastPage />} />
            </Routes>
        </div>
    );
}

export default StreamViewerPage;