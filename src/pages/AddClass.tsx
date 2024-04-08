import axios from "axios";
import { useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import useAuthStore from "../store/authStore";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const classSchema = z.object({
  name: z.string().min(1, { message: "O título da aula é obrigatório" }),
  description: z.string().min(1, { message: "A descrição da aula é obrigatória" }),
  duration: z.number().min(1, { message: "A duração deve ser pelo menos 1 minuto" }),
  dataDeLancamento: z.string().min(1, { message: "A data de lançamento é obrigatória" }),
  videos: z.array(z.object({
    title: z.string().min(1, { message: "O título do vídeo é obrigatório" }),
    url: z.string().url({ message: "A URL do vídeo deve ser válida" }),
  })),
});

interface FormValues {
  name: string;
  description: string;
  archives?: string;
  duration: number;
  dataDeLancamento: string;
  videos: { title: string; url: string }[];
}

export const AddClass = () => {
  const { id: cursoId } = useParams<{ id: string }>();
  const userToken = useAuthStore((state) => state.userToken);
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      videos: [{ title: '', url: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "videos",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const archivesValue = data.archives || '';
    const classData = {
      ...data,
      archives: archivesValue,
      cursoId,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/class`, classData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      reset();
      toast.success('Aula adicionada com sucesso!');
    } catch (error) {
      console.error("Erro ao adicionar a aula:", error);
      toast.error('Erro ao adicionar a aula.');
    }
  };

  return (
    <Layout>
      <>
      <ToastContainer />
      <h1 className="text-4xl font-semibold text-custom-green">Adicionar nova aula</h1>
      <div className="mt-5">
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Título da Aula */}
          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="name">Título da Aula</label>
            <input
              {...register("name")}
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Título da aula"
            />
            {errors.name && <p className="my-2 text-red-500">{errors.name.message}</p>}
          </div>

          {/* Descrição da Aula */}
          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="description">Descrição da Aula</label>
            <textarea
              {...register("description")}
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Descrição da aula"
            />
            {errors.description && <p className="my-2 text-red-500">{errors.description.message}</p>}
          </div>

          {/* Link dos Arquivos (Opcional) */}
          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="archives">Link dos Arquivos (Opcional)</label>
            <input
              {...register("archives")}
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Link dos arquivos: https://..."
            />
            {errors.archives && <p className="my-2 text-red-500">{errors.archives.message}</p>}
          </div>

          {/* Duração da Aula */}
          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="duration">Duração (em minutos)</label>
            <input
              type="number"
              {...register("duration", { valueAsNumber: true })}
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Duração da aula em minutos"
            />
            {errors.duration && <p className="my-2 text-red-500">{errors.duration.message}</p>}
          </div>

          {/* Data de Lançamento */}
          <div>
            <label className="block mb-2 font-bold text-gray-700" htmlFor="dataDeLancamento">Data de Lançamento</label>
            <input
              type="date"
              {...register("dataDeLancamento")}
              className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            />
            {errors.dataDeLancamento && <p className="my-2 text-red-500">{errors.dataDeLancamento.message}</p>}
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex-1">
                <label className="block mb-2 font-bold text-gray-700">Título do Vídeo</label>
                <input
                  {...register(`videos.${index}.title` as const)}
                  className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="Título do vídeo"
                />
                {errors.videos?.[index]?.title?.message && (
                  <p className="my-2 text-red-500">{errors.videos?.[index]?.title?.message}</p>
                )}
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <label className="block mb-2 font-bold text-gray-700">URL do Vídeo</label>
                <input
                  {...register(`videos.${index}.url` as const)}
                  className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="URL do vídeo"
                />
                {errors.videos?.[index]?.url?.message && (
                  <p className="my-2 text-red-500">{errors.videos?.[index]?.url?.message}</p>
                )}
              </div>
              <div className="flex items-end mb-4">
                <button type="button" onClick={() => remove(index)} className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700">Remover</button>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-x-3">
          <button type="button" onClick={() => append({ title: '', url: '' })} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">Incluir vídeo novo</button>

          <button type="submit" className="px-4 py-2 font-bold text-white rounded bg-custom-green hover:bg-light-green">
            Adicionar aula
          </button>
          </div>
        </form>
      </div>
      </>
    </Layout>
  );
};
