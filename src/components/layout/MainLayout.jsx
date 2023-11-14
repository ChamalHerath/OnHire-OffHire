import SideBarPanel from "./SideBarPanel";

import { userContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { TopNav } from "./TopNav";

// Layout component
const Layout = ({ children }) => {
  const { userLogged } = useContext(userContext);

  return (
    <div>
      {/* <TopBar /> */}
      {userLogged && <TopNav />}

      <div className="flex h-screen dark:bg-gray-900 ">
        <>
          <div className="hidden lg:block ">
            <div className=" w-full h-full">
              {userLogged && <SideBarPanel />}
            </div>
          </div>
          <main className="overflow-auto w-full">
            <div className="w-full">
              <div className="">{children}</div>
            </div>
          </main>
        </>
      </div>
    </div>
  );
};

export default Layout;
