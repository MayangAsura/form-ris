import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';
import {Helmet, HelmetProvider} from "react-helmet-async";

import AOS from 'aos';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Payment from './pages/Payment';
import Jenjang from './pages/Jenjang';
import RedirectPayment from './pages/RedirectPayment';

// import RequireAuth from 'react-auth-kit'
// import {AuthProvider} from 'react-auth-kit'

function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        {/* <Route exact path="/" element={<Jenjang />} /> */}
        <Route exact path="/" element={<Jenjang />} />
        <Route path="/home" element={
          // <RequireAuth loginPath="/login">
            <Home />
          // </RequireAuth>
          }/>
        <Route path="/login" element={<SignIn />} />
        <Route path="/logout" element={<SignIn />} />
        <Route path="/:code" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/pay" element={<Payment />} />
        <Route path="/landing" element={<RedirectPayment />} />
        {/* <Route path="/:code" element={<Home />} /> */}
      </Routes>

      <HelmetProvider>
        <Helmet>
          <script src='https://app-sandbox.duitku.com/lib/js/duitku.js'></script>
        </Helmet>
      </HelmetProvider>
    </>
  );
}

export default App;
