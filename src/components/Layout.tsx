import { ReactElement, useState } from "react";
import { SidebarMenu } from "./SidebarMenu";

export const Layout = ({ children }: { children: ReactElement }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex h-screen">
      <SidebarMenu isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`flex-1 w-full p-5 md:p-10 ${isSidebarOpen ? 'ml-[16rem]' : 'ml-0'} md:ml-[16rem]`}>
        <button className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          ☰
        </button>
        {children}
      </div>
    </main>
  );
};
