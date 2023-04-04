import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './UI/Home';
import About from './UI/About';
import MyLocations from './UI/MyLocations';
import NavBar from './UI/Navbar';
import Events from './UI/Events'; // Import the MoviesAndStandups component
import MovieDetails from './UI/MovieDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/locations"
          element={
            <MainLayout>
              <MyLocations />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/events" // Add a new route for the MoviesAndStandups component
          element={
            <MainLayout>
              <Events />
            </MainLayout>
          }
        />
        <Route
          path="/movie/:index" 
          element={
            <MainLayout>
              <MovieDetails />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function MainLayout(props: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      {props.children}
    </div>
  );
}

export default App;

