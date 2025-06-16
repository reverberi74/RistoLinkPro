import { useLocation } from "react-router-dom";
import CustomImage from "../shared/CustomImage";

const nameMap = {
  dashboard: "Dashboard",
  tables: "Tavoli",
  reviews: "Recensioni",
  menu: "Gestione Menu",
}

const LayoutNavbar = () => {
  const location = useLocation();

  const getPageName = () => {
    return nameMap[location.pathname.split("/").at(-1)]
  }
  
  return (
    <div className="flex flex-col w-full items-center">
      <nav className="flex w-full items-center justify-between py-10 px-4 max-w-[972px] ">
        <div>
          <h1 className="font-bold text-lg capitalize">{getPageName()}</h1>
        </div>
        <div>
          <CustomImage
            src="/images/business_images/Logo-TableLink.jpg"
            className="h-[60px] w-[130px]"
          />
        </div>
      </nav>
    </div>
  );
};

export default LayoutNavbar;