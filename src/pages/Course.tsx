import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAuthStore from "../store/authStore";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const courseSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  description: z.string().min(1, { message: "A descrição é obrigatória" }),
  urlImg: z.string().min(1, { message: "A imagem é obrigatória" }),
});


interface Course {
  id: string;
  name: string;
  description: string;
  urlImg: string;
}

interface UpdateCourse {
  id: string;
  name?: string;
  description?: string;
  urlImg?: string;
}

interface ClassItem {
  id: string;
  name: string;
  description: string;
  videos: string;
  dataDeLancamento: string;
  duration: number;
  archives: string;
  cursoId: string;
}

export const Course = () => {
  const userToken = useAuthStore((state) => state.userToken);
  const [course, setCourse] = useState<Course>();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateCourse>({
    resolver: zodResolver(courseSchema),
  });

  useEffect(() => {
    const fetchDataCourse = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        toast.error('Erro ao buscar o curso.');
        console.error("Erro ao buscar dados:", error);
      }
    }
  
    const fetchDataClasses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/class`);
        const filteredClasses = response.data.filter((item: ClassItem) => item.cursoId === id);
        setClasses(filteredClasses);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    Promise.all([fetchDataCourse(), fetchDataClasses()]);
  }, [id]);

  const onSubmit = async (data: UpdateCourse) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/courses/${id}`, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      reset();
      toast.success('Curso atualizado com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar o curso:", error);
      toast.error('Erro ao atualizar o curso.');
    }
  };

  const handleDeleteClass = async (classId: string) => {
    try {
      axios.delete(`${import.meta.env.VITE_API_URL}/class/${classId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/class`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const filteredClasses = response.data.filter((item: ClassItem) => item.cursoId === id);
      setClasses(filteredClasses);
      toast.success('Aula excluída com sucesso!');
    } catch (error) {
      console.error("Erro ao excluir aula:", error);
      toast.error('Erro ao excluir aula.');
    }
  };

  return (
    <Layout>
      <>
        <ToastContainer />
        <h1 className="text-4xl font-semibold text-custom-green">Nome do curso: {course?.name}</h1>
        <p className="mt-2 mb-5 text-light-green">Descrição: {course?.description}</p>

        <div className="mt-10">
          <h2 className="mb-4 text-xl">Para alterar o curso, preencha os campos abaixo e clique em alterar:</h2>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="name">
              Nome do curso
            </label>
            <input
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Nome do curso"
              {...register("name")}
            />
            
            {errors.name && <p className="my-2 text-red-500">{errors.name.message}</p>}

            <label className="block mb-2 font-bold text-gray-700" htmlFor="description">
              Descrição do curso
            </label>
            <input
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Descrição do curso"
              {...register("description")}
            />

            {errors.description && <p className="my-2 text-red-500">{errors.description.message}</p>}

            <label className="block mb-2 font-bold text-gray-700" htmlFor="urlImg">
              Imagem do curso
            </label>
            <input
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Link da imagem: https://..."
              {...register("urlImg")}
            />

            {errors.urlImg && <p className="my-2 text-red-500">{errors.urlImg.message}</p>}

            <button className="w-full px-4 py-2 mt-5 font-bold text-white rounded bg-custom-green hover:bg-light-green">
              Alterar
            </button>
          </form>
          <hr className="my-5 border-gray-300"/>

          <div className="mt-10">
          <h2 className="mb-4 text-xl font-semibold">Aulas do curso</h2>
          <Link to={`/curso/${id}/adicionar-aula`}
            className="px-4 py-2 font-bold text-white rounded bg-custom-green hover:bg-light-green"
          >
            Adicionar Nova Aula
          </Link>
          <table className="min-w-full mt-4 leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">Nome</th>
                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">Descrição</th>

                <th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">Ações</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((classItem) => (
                <tr key={classItem.id}>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">{classItem.name}</td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">{classItem.description}</td>
                  <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                    <Link to={`/class/${classItem.id}`} className="text-blue-500 hover:text-blue-600">Editar</Link>
                    <button onClick={() => handleDeleteClass(classItem.id)} className="ml-4 text-red-500 hover:text-red-600">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </>
    </Layout>
  )
}