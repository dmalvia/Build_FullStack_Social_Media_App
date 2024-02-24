import * as React from "react";
import Sidebar from "../sidebar";
import UserList from "../userList";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {
  return (
    <div className="flex bg-white">
      <aside className="flex gap-x-4 bg-gray-800 fixed top-0 left-0 z-40 lg:w-60 h-screen">
        <Sidebar />
      </aside>
      <div className="lg:ml-60 lg:mr-60 p-8 flex-1 ml-36">{children}</div>
      <aside className="hidden lg:block bg-gray-800 fixed top-0 right-0 z-40 lg:w-60 h-screen">
        <UserList />
      </aside>
    </div>
  );
};

export default Layout;
