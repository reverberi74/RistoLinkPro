import { useDispatch } from "react-redux";
import CustomImage from "../shared/CustomImage";
import { Link } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import { setTableNumber } from "../../store/slices/tableClientSlice";

const SideBar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setTableNumber(null));
    localStorage.removeItem("tableNumber");
  };

  return (
    <div className="flex flex-col gap-10 px-4 py-15  items-center min-w-[320px] h-full border-r-1 border-[#0000001A]">
      <div>
        <CustomImage
          src="/images/business_images/logo-restaurant.png"
          className="h-[150px] w-[109.35px]"
        />
      </div>
      <div className="flex flex-col gap-5 text-wrap ">
        <Link to="/dashboard" className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-xl">
          <CustomImage
            src="/images/business_images/Dashboard.png"
            className="h-[20.15px] w-[20.15px]"
          />
          <span>Dashboard</span>
        </Link>
        <Link to="/dashboard/tables" className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-xl">
          <CustomImage
            src="/images/business_images/Tavoli.png"
            className="h-[20.15px] w-[20.15px]"
          />

          <span>Tavoli</span>
          </Link>
        <Link to="/dashboard/orders" className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-xl">
          <CustomImage
            src="/images/business_images/Menu.png"
            className="h-[20.15px] w-[20.15px]"
          />

          <span>Gestione Ordini</span>
        </Link>
        <Link to="/dashboard/reviews" className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-xl ">
          <CustomImage
            src="/images/business_images/Reviews.png"
            className="h-[20.15px] w-[20.15px]"
          />

          <span>Recensioni</span>
        </Link>
        <Link to="/dashboard/menu" className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-xl">
          <CustomImage
            src="/images/business_images/Menu.png"
            className="h-[20.15px] w-[20.15px]"
          />

          <span>Gestione Menu</span>
        </Link>
        <div onClick={handleLogout} className="flex gap-2 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-xl">
          <CustomImage
            src="/images/business_images/Logout.png"
            className="h-[20.15px] w-[20.15px]"
          />

          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
