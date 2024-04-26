// StreamContext.js
import React, { createContext, useContext, useState } from 'react';

const StreamContext = createContext();

export const StreamProvider = ({ children }) => {
    const [stream, setStream] = useState(null);

    const setLiveStream = (streamData) => {
        setStream(streamData);
    };

    return (
        <StreamContext.Provider value={{ stream, setLiveStream }}>
            {children}
        </StreamContext.Provider>
    );
};

export const useStream = () => {
    const context = useContext(StreamContext);
    if (!context) {
        throw new Error('useStream must be used within a StreamProvider');
    }
    return context;
};
