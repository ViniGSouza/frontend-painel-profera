import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "./Layout";
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

export const Course = () => {
  const userToken = useAuthStore((state) => state.userToken);
  const [course, setCourse] = useState<Course>();
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateCourse>({
    resolver: zodResolver(courseSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
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
        </div>
      </>
    </Layout>
  )
}