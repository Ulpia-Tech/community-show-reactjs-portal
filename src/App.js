import React from 'react';
import { LoginPage } from './pages/LoginPage';
import { Routes, Route } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';

import { ProtectedRoute } from './components/security/protectedRoute';

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>

        <Route path='/dashboard' element={
          <ProtectedRoute>
            <DashboardPage/>
          </ProtectedRoute> 
        }></Route>
      </Routes>
    </>
  );
};

export default App;