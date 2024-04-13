import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StreamList from './components/StreamList';
import StreamViewerPage from './components/StreamViewerPage';
import ViewerDashboard from './components/ViewerDashboard';
import Home from './components/Home';

function App() {
  return(
    <Router>
      <Routes>
        {/* Define routes with valid components */}
        <Route exact path="/" element={<Home />} />
        <Route path="/streams" element={<StreamList />} />
        <Route path="/stream-viewer" element={<StreamViewerPage />} />
        <Route path="/viewers-dashboard" element={<ViewerDashboard />} />
      </Routes>
    </Router>
  )
}

export default App;
