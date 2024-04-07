import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen my-auto">
      <h1 className="text-4xl text-center text-light-green">
        404 - Página não encontrada.
      </h1>
      <Link to="/dashboard" className="block mt-10">
        <span className="p-3 font-bold text-white rounded bg-custom-green hover:bg-light-green">Ir para página inicial</span>
      </Link>
    </div>
  )
}