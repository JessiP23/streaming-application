// App.js
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StreamList from './components/StreamList';
import StreamViewerPage from './components/StreamViewerPage';
import ViewerDashboard from './components/ViewerDashboard';
import Home from './components/Home';
import StreamTransferForm from './components/StreamTransferForm';
import StreamerSecretCodeForm from './components/StreamerSecretCodeForm';
import StreamInitiationModal from './components/StreamInitiationModal';
import StreamDetails from './components/StreamDetails';
import { StreamProvider } from './components/StreamContext';
import StreamStart from './components/StreamStart';

function App() {
  return(
    <Router>
      <StreamProvider> 
        <div>
          <ul> 
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/streams">Streams</Link>
            </li>
            <li>
              <Link to="/streams-initiation">Stream Initiation</Link>
            </li>
            <li>
              <Link to="/stream-start">Start LiveStream</Link>
            </li>
            <li>
              <Link to="/view-stream">View Stream</Link>
            </li>
          </ul>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/streams" element={<StreamList />} />
            <Route path="/streams/:streamId" element={<StreamViewerPage/>} />
            <Route path="/stream-start/" element={<StreamStart/>} />
            <Route path="/viewers-dashboard" element={<ViewerDashboard />} />
            <Route path="/stream-transfer" element={<StreamTransferForm />} />
            <Route path="/streamer-secret-code" element={<StreamerSecretCodeForm />} />
            <Route path='/streams-initiation' element={<StreamInitiationModal />} />
            <Route path='/stream-details/:streamId' element={<StreamDetails />} />
          </Routes>
        </div>
      </StreamProvider>
    </Router>
  )
}

export default App;


