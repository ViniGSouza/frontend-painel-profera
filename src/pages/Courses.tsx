import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import axios from "axios";
import { Link } from "react-router-dom";

interface Course {
  id: string;
  name: string;
  description: string;
}

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold">Cursos</h1>
        <p className="mt-2 mb-10">Adicione um novo curso ou selecione um existente para alterar:</p>

        <Link to="/adicionar-curso">
          <span className="p-3 font-bold text-white rounded bg-custom-green hover:bg-light-green">Adicionar novo curso</span>
        </Link>
        <hr className="my-5 border-gray-300" />

        <div className="flex flex-wrap gap-4">
          {courses.map((course) => (
            <Link key={course.id} to={`/curso/${course.id}`} className="flex-1 text-center">
              <h2 className="p-3 text-2xl font-bold text-white rounded bg-custom-green hover:bg-light-green">{course.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}