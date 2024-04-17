import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import StreamInitiationModal from "./StreamInitiationModal";
import WebSocketComponent from "./WebSocket";
import StreamStart from "./StreamStart";
import StreamTransferForm from "./StreamTransferForm";
import StreamViewerPage from "./BroadcastPage";

function ViewerDashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStreamStarted, setIsStreamStarted] = useState(false); // New state variable
    const navigate = useNavigate();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h2>Viewer Dashboard</h2>
            {isModalOpen && <StreamInitiationModal onClose={handleCloseModal} /> }
            <WebSocketComponent />
            {isStreamStarted && <StreamViewerPage />}
            <StreamTransferForm />
        </div>
    );
}

export default ViewerDashboard;
