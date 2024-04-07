import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import useAuthStore from './store/authStore';
import { Courses } from './pages/Courses';
import { Classes } from './pages/Classes';
import { Course } from './components/Course';
import { AddCourse } from './components/AddCourse';
import { NotFound } from './pages/404';

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
        <Route path="/cursos" element={<PrivateRoute element={<Courses />} />} />
        <Route path="/aulas" element={<PrivateRoute element={<Classes />} />} />
        <Route path="/curso/:id" element={<PrivateRoute element={<Course />} />} />
        <Route path="/adicionar-curso" element={<PrivateRoute element={<AddCourse />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
