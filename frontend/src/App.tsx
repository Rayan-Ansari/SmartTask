import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

import Home      from './pages/Home';
import Login     from './pages/Login';
import MyList    from './pages/MyList';   
import NotFound  from './pages/NotFound';

import HomeNav   from './components/HomeNav';

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <HomeNav />

        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/dashboard" element={<MyList />} />
          <Route path="*"          element={<NotFound />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

