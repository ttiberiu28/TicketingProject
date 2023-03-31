import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './UI/Home';
import About from './UI/About';
import MyLocations from './UI/MyLocations';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<MyLocations />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
