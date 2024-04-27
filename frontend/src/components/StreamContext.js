import React, { createContext, useState, useContext } from "react";
const StreamContext = createContext();

export const StreamProvider = ({ children }) => {
    const [stream, setStream] = useState(null);

    return (
        <StreamContext.Provider value={{stream, setStream}}>
            {children}
        </StreamContext.Provider>
    );
};

export const useStream = () => useContext(StreamContext);