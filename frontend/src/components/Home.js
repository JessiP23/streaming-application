import React from 'react';
import { Link } from 'react-router-dom';
import StreamList from './StreamList';

function Home() {
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
        <li>
          <Link to="/stream-start">Start Streaming</Link>
        </li>
      </ul>
      <StreamList /> 
    </div>
  );
}

export default Home;