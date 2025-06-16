import SideBar from "./SideBar";
import LayoutNavbar from "./LayoutNavbar";

const NavbarBusinessLogged = ({ children }) => {
  return (
    <div className="max-w-[100vw] min-h-[100vh] bg-[#3BC8E11A] flex justify-center items-start ">
      <div
        className="max-w-[1440px] w-full bg-white h-screen flex"
        style={{
          boxShadow: "0 0 10px 1px rgba(0, 0, 0, 0.3)",
        }}
      >
        <SideBar />
        <div className="w-full h-full overflow-auto no-scrollbar">
          <LayoutNavbar />
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default NavbarBusinessLogged;