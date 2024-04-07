import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import useAuthStore from './store/authStore';

const App: React.FC = () => {
  const userToken = useAuthStore((state) => state.userToken);

  return (
    <BrowserRouter>
      <Routes>
        {userToken ? 
        <Route path="/" element={<PrivateRoute element={<Dashboard />} />} /> 
        : 
        <Route path="/" element={<Login />} />}

        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
