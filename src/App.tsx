import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import useAuthStore from './store/authStore';
import { Courses } from './pages/Courses';
import { Course } from './pages/Course';
import { AddCourse } from './pages/AddCourse';
import { NotFound } from './pages/404';
import { AddClass } from './pages/AddClass';
import { EditClass } from './pages/EditClass';

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
        <Route path="/adicionar-curso" element={<PrivateRoute element={<AddCourse />} />} />
        <Route path="/curso/:id" element={<PrivateRoute element={<Course />} />} />
        <Route path="/curso/:id/adicionar-aula" element={<PrivateRoute element={<AddClass />} />} />
        <Route path="/class/:id" element={<PrivateRoute element={<EditClass />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
