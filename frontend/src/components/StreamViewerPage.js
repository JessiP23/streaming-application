import React from "react";
import BroadcastPage from "./BroadcastPage";
import { Routes, Route, useParams } from 'react-router-dom';

function StreamViewerPage() {
    const { streamId } = useParams();
    return (
        <div>
            <h2>Stream Viewer</h2>
            <Routes>
                <Route path="/stream-viewer/:streamDetails/*" element={<BroadcastPage />} />
            </Routes>
        </div>
    );
}

export default StreamViewerPage;