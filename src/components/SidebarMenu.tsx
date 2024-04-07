
import { Link, useLocation } from "react-router-dom";
import logoProfera from "../assets/logo_profera_leao.png";

export const SidebarMenu = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 px-2 space-y-6 text-white sidebar py-7 bg-custom-green">
      <img src={logoProfera} alt="Logo Profera" className="mx-auto" />
      <h1 className="text-3xl font-bold text-center text-white">P R O F E R A</h1>
      <nav className="font-semibold text-center">
        <Link to={"/cursos"} className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/cursos') ? 'bg-light-green' : ''} text-white hover:bg-light-green`}>
          Cursos
        </Link>
        <Link to={"/aulas"} className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/aulas') ? 'bg-light-green' : ''} text-white hover:bg-light-green`}>
          Aulas
        </Link> 
      </nav>
    </div>
  );
};
