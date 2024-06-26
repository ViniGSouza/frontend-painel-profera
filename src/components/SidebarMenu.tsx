
import { Link, useLocation } from "react-router-dom";
import logoProfera from "../assets/logo_profera_leao.png";
import { IoLogOut } from "react-icons/io5";
import { MdVideoLibrary } from "react-icons/md";


export const SidebarMenu = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <div className={`fixed top-0 left-0 z-50 w-64 h-screen px-2 overflow-y-auto text-white py-7 bg-custom-green ${isOpen ? 'block' : 'hidden'} md:block`}>
      <button className="md:hidden" onClick={() => setIsOpen(false)}>
        ✕
      </button>
      <Link to={"/dashboard"}>
        <img src={logoProfera} alt="Logo Profera" className="mx-auto" />
        <h1 className="mt-2 text-3xl font-bold text-center text-white">P R O F E R A</h1>
      </Link>
      <nav className="mt-5 font-semibold text-center">
        <Link to={"/cursos"} className={`w-full flex justify-center items-center py-2.5 px-4 rounded transition duration-200 ${isActive('/cursos') ? 'bg-light-green' : ''} text-white hover:bg-light-green border-b-[2px] border-b-custom-green mb-2`}>
          Cursos
          <MdVideoLibrary className="ml-2" size={20} />
        </Link>
        <button onClick={handleLogout} className="flex justify-center items-center w-full py-2.5 px-4 rounded transition duration-200 bg-custom-green text-white hover:bg-light-green border-b-[2px] border-b-custom-green">
          Sair
          <IoLogOut className="ml-2" size={20} />
        </button>
      </nav>
    </div>
  );
};
