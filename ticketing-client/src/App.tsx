// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Home from './UI/Home';
// import About from './UI/About';
// import MyLocations from './UI/MyLocations';
// import NavBar from './UI/Navbar';
// import Events from './UI/Events';
// import MovieDetails from './UI/MovieDetails';
// import StandUpDetails from './UI/StandUpDetails';
// import MyLogin from './UI/Login';

// function App() {
//   const [loginStatus, setLoginStatus] = useState<'success' | 'failure' | ''>('');

//   const handleLogin = () => {
//     setLoginStatus('success');
//   };

//   const handleLoginError = () => {
//     setLoginStatus('failure');
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/locations"
//           element={
//             <MainLayout>
//               <MyLocations />
//             </MainLayout>
//           }
//         />
//         <Route
//           path="/about"
//           element={
//             <MainLayout>
//               <About />
//             </MainLayout>
//           }
//         />
//         <Route
//           path="/events"
//           element={
//             <MainLayout>
//               <Events />
//             </MainLayout>
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <MainLayout>
//               <MyLogin onLogin={handleLogin} onLoginError={handleLoginError} />
//             </MainLayout>
//           }
//         />

//         <Route
//           path="/movie/:index"
//           element={
//             <MainLayout>
//               <MovieDetails />
//             </MainLayout>
//           }
//         />
//         <Route
//           path="/standup/:index"
//           element={
//             <MainLayout>
//               <StandUpDetails />
//             </MainLayout>
//           }
//         />
//       </Routes>
//       {loginStatus && (
//         <div
//           className={`alert alert-${loginStatus === 'success' ? 'success' : 'danger'} alert-dismissible fade show`}
//           role="alert"
//         >
//           {loginStatus === 'success' ? 'Login successful' : 'Login failed'}
//           <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//         </div>
//       )}
//     </BrowserRouter>
//   );
// }

// function MainLayout(props: { children: React.ReactNode }) {
//   return (
//     <div>
//       <NavBar />
//       {props.children}
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './UI/Home';
import About from './UI/About';
import MyLocations from './UI/MyLocations';
import NavBar from './UI/Navbar';
import Events from './UI/Events';
import MovieDetails from './UI/MovieDetails';
import StandUpDetails from './UI/StandUpDetails';
import MyLogin from './UI/Login';

interface Props {
  onLogin: () => void;
  onLoginError: () => void;
}

function App() {
  const [loginStatus, setLoginStatus] = useState<'success' | 'failure' | ''>('');

  const handleLogin = () => {
    setLoginStatus('success');
  };

  const handleLoginError = () => {
    setLoginStatus('failure');
  };

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
              <MyLogin onLogin={handleLogin}/>
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

