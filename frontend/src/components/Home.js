import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StreamStart from './StreamStart';
import StreamList from './StreamList';

function Home() {
    const [isStreaming, setIsStreaming] = useState(false);

    const handleStartStreaming = () => {
        setIsStreaming(true);
    };
    
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the content of the home page.</p>
      <ul>
        <li>
          <Link to="/streams">View Streams</Link>
        </li>
        <li>
          <Link to="/stream-viewer">Stream Viewer</Link>
        </li>
        <li>
          <Link to="/viewers-dashboard">Viewers Dashboard</Link>
        </li>
      </ul>

      {isStreaming ? (
        <StreamStart />
      ) : (
        <button onClick={handleStartStreaming}>Start Streaming</button>
      )}

      <StreamList />
    </div>
  );
}

export default Home;
