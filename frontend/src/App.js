import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StreamList from './components/StreamList';
import Home from './components/Home';
import StreamStart from './components/StreamStart';
import StreamViewerPage from './components/StreamViewerPage';

function App() {
  return(
    <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/streams" element={<StreamList />} />
            <Route path="/stream-start/" element={<StreamStart/>} />
            <Route path='/streams/:streamId' element={<StreamViewerPage />} />
          </Routes>
    </Router>
  )
}

export default App;


