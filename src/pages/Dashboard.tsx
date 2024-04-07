import { Layout } from "../components/Layout";
import natureza from "../assets/natureza.jpeg";
import matematica from "../assets/matematica.jpeg";
import humanas from "../assets/humanas.jpeg";
import linguagens from "../assets/linguagens.jpeg";

export const Dashboard = () => {
  return (
    <Layout>
      <div className="flex-1 p-10">
        <h2 className="mb-4 text-3xl font-semibold text-custom-green">Bem-vindo!</h2>
        <p className="mb-5">Selecione o curso que você deseja alterar ou navegue no menu ao lado para inserir/editar aulas.</p>
        <div className="flex flex-wrap -mx-3">

          <div className="w-full px-3 mb-6 lg:w-1/2">
            <div className="grid grid-cols-2 bg-white rounded-lg shadow-lg">
              <img src={natureza} alt="" />
              <div className="flex flex-col p-3 my-auto">
                <h3 className="mb-2 text-xl font-medium text-center text-light-green">
                  Ciências da natureza e suas tecnologias
                </h3>
              </div>
            </div>
          </div>
          
          <div className="w-full px-3 mb-6 lg:w-1/2">
          <div className="grid grid-cols-2 bg-white rounded-lg shadow-lg">
              <img src={matematica} alt="" />
              <div className="flex flex-col p-3 my-auto">
                <h3 className="mb-2 text-xl font-medium text-center text-light-green">
                  Matemática e suas tecnologias
                </h3>
              </div>
            </div>
          </div>

        
          <div className="w-full px-3 mb-6 lg:w-1/2">
          <div className="grid grid-cols-2 bg-white rounded-lg shadow-lg">
              <img src={humanas} alt="" />
              <div className="flex flex-col p-3 my-auto">
                <h3 className="mb-2 text-xl font-medium text-center text-light-green">
                  Ciências humanas e suas tecnologias
                </h3>
              </div>
            </div>
          </div>

          
          <div className="w-full px-3 mb-6 lg:w-1/2">
            <div className="grid grid-cols-2 bg-white rounded-lg shadow-lg">
              <img src={linguagens} alt="" />
              <div className="flex flex-col p-3 my-auto">
                <h3 className="mb-2 text-xl font-medium text-center text-light-green">
                  Linguagens
                </h3>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  )
}