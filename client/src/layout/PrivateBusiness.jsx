import { Outlet } from "react-router-dom";
import NavbarBusinessLogged from "../components/dashboard/NavbarBusinessLogged";

const PrivateBusiness = () => {
  return (
    <>
      <NavbarBusinessLogged>
        <main className="overflow-auto h-auto">
          <div className="max-w-[1440px] w-full flex justify-center items-center">
            <Outlet />
          </div>
        </main>
      </NavbarBusinessLogged>
    </>
  );
};

export default PrivateBusiness;