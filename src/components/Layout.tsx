import { ReactElement } from "react";
import { SidebarMenu } from "./SidebarMenu";

export const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <main className="flex h-screen">
      <SidebarMenu />
      {children}
    </main>
  );
};
