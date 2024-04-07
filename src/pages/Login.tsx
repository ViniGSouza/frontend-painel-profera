import logoProfera from "../assets/logo_profera.png"

export const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={logoProfera} alt="Logo Profera" />
        </div>

        <form>
          <div className="mb-4">
            <input
              className="appearance-none border border-gray-300 rounded-lg py-2 px-3 w-full"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <input
              className="appearance-none border border-gray-300 rounded-lg py-2 px-3 w-full"
              type="password"
              placeholder="Senha"
              required
            />
          </div>
          <button className="bg-custom-green hover:bg-light-green text-white font-bold py-2 px-4 rounded-lg w-full">
            ENTRAR
          </button>
        </form>

      </div>
    </div>
  );
};
