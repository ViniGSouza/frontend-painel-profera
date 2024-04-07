import logoProfera from "../assets/logo_profera_leao.png";
import natureza from "../assets/natureza.jpeg";
import matematica from "../assets/matematica.jpeg";
import humanas from "../assets/humanas.jpeg";
import linguagens from "../assets/linguagens.jpeg";

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="sidebar w-64 space-y-6 py-7 px-2 bg-custom-green text-white">
        <img src={logoProfera} alt="Logo Profera" className="mx-auto" />
        <h1 className="text-3xl font-bold text-white text-center">P R O F E R A</h1>
        <nav className="text-center font-semibold">
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 bg-light-green text-white">
            Cursos
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-light-green text-white">
            Aulas
          </a> 
        </nav>
      </div>

      <div className="flex-1 p-10">
        <h2 className="text-3xl font-semibold text-custom-green mb-4">Bem-vindo, Fulano</h2>
        <p className="mb-5">Selecione o curso que você deseja alterar ou navegue no menu ao lado para inserir/editar aulas.</p>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full lg:w-1/2 px-3 mb-6">
            <div className="grid grid-cols-2 bg-white rounded-lg shadow-lg">
              <img src={natureza} alt="" />
              <div className="flex flex-col my-auto p-3">
                <h3 className="text-xl font-medium mb-2 text-center text-light-green">
                  Ciências da natureza e suas tecnologias
                </h3>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-3 mb-6">
          <div className="grid grid-cols-2 bg-white rounded-lg shadow-lg">
              <img src={matematica} alt="" />
              <div className="flex flex-col my-auto p-3">
                <h3 className="text-xl font-medium mb-2 text-center text-light-green">
                  Matemática e suas tecnologias
                </h3>
              </div>
            </div>
          </div>

        
          <div className="w-full lg:w-1/2 px-3 mb-6">
          <div className="grid grid-cols-2 bg-white rounded-lg shadow-lg">
              <img src={humanas} alt="" />
              <div className="flex flex-col my-auto p-3">
                <h3 className="text-xl font-medium mb-2 text-center text-light-green">
                  Ciências humanas e suas tecnologias
                </h3>
              </div>
            </div>
          </div>

          
          <div className="w-full lg:w-1/2 px-3 mb-6">
          <div className="grid grid-cols-2 bg-white rounded-lg shadow-lg">
              <img src={linguagens} alt="" />
              <div className="flex flex-col my-auto p-3">
                <h3 className="text-xl font-medium mb-2 text-center text-light-green">
                  Linguagens
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

