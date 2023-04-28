import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './UI/Home';
import About from './UI/About';
import MyLocations from './UI/LocationsComponents/MyLocations';
import NavBar from './UI/Navbar';
import Events from './UI/EventsElements/Events';
import MovieDetails from './UI/MovieComponents/MovieDetails';
import StandUpDetails from './UI/StandupComponents/StandUpDetails';
import ConcertDetails from './UI/ConcertComponents/ConcertDetails';
import MyLogin from './UI/Login';
import { AuthProvider, useAuth } from './UI/AuthContext';
import MySignUp from './UI/SingUp';
import { CartProvider } from './UI/CartElements/CartContext';
import MovieOffers from './UI/MovieComponents/MovieOffers';
import Checkout from './UI/CartElements/Checkout';
import UserPreference from './UI/UserPreference';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
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
        <Route
          path="/concert/:index"
          element={
            <MainLayout>
              <ConcertDetails />
            </MainLayout>
          }
        />
        <Route
          path="/location/:index"
          element={
            <MainLayout>
            </MainLayout>
          }
        />
        <Route
          path="/offers"
          element={
            <MainLayout>
              <MovieOffers />
            </MainLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        />

        <Route
          path="/preferences"
          element={
            <MainLayout>
              <UserPreference />
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

