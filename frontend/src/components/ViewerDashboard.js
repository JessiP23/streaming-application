import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import StreamInitiationModal from "./StreamInitiationModal";
import WebSocketComponent from "./WebSocket";

function ViewerDashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleStartStream = () => {
        navigate('/streams-initiation');
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h2>Viewer Dashboard</h2>
            <button onClick={handleStartStream}>Start Stream</button>
            <button onClick={handleOpenModal}>Start Stream (Modal)</button>
            {isModalOpen && <StreamInitiationModal onClose={handleCloseModal} /> }
            <WebSocketComponent />
        </div>
    );
}

export default ViewerDashboard;