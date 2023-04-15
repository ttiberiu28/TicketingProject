import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './UI/Home';
import About from './UI/About';
import MyLocations from './UI/MyLocations';
import NavBar from './UI/Navbar';
import Events from './UI/Events';
import MovieDetails from './UI/MovieComponents/MovieDetails';
import StandUpDetails from './UI/StandupComponents/StandUpDetails';
import MyLogin from './UI/Login';
import { AuthProvider, useAuth } from './UI/AuthContext';
import MySignUp from './UI/SingUp';

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const [loginStatus, setLoginStatus] = useState<'success' | 'failure' | ''>('');
  const auth = useAuth();
  const { restoreAuthFromLocalStorage } = useAuth();

  const handleLogin = () => {
    setLoginStatus('success');
  };

  const handleLoginError = () => {
    setLoginStatus('failure');
  };

  useEffect(() => {
    auth.restoreAuthFromLocalStorage();
  }, []);

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
          path="/events"
          element={
            <MainLayout>
              <Events />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout>
              <MyLogin onLogin={handleLogin} />
            </MainLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <MainLayout>
              <MySignUp />
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
        <Route
          path="/standup/:index"
          element={
            <MainLayout>
              <StandUpDetails />
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

