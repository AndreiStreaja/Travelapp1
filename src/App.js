// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import DestinatiiTuristiceEuropa from './components/Destinations';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/destinations" element={<DestinatiiTuristiceEuropa />} />

      </Routes>
    </Router>
  );
};

export default App;
