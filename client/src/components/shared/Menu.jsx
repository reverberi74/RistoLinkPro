import { useSelector } from "react-redux";
import CustomImage from "./CustomImage";
import { Link } from "react-router-dom";

const Menu = ({ toggleMenu }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 h-full w-screen bg-[#00000061] -z-10">
      <div
        className="bg-white w-[280px] h-screen absolute top-[66px] p-6"
        style={{ right: "calc(50vw - (375px / 2))" }}
      >
        <div className="flex items-center justify-left gap-2 py-6">
          <CustomImage src="/images/menu_images/Profile_user.png" />
          <h1 className="font-semibold text-text pl-2">
            {user.first_name} {user.last_name}
          </h1>
        </div>
        <hr className="border-t border-gray-200 pb-3" />
        <div className="flex flex-col py-6 gap-3">
          <Link
            onClick={toggleMenu}
            to="/private/personalprofile"
            className="px-1 h-[50px] flex items-center gap-2 py-6 rounded-2xl hover:bg-gray-100"
          >
            <CustomImage src="/images/menu_images/User.png" alt="" />
            <span className="pl-2">Profilo personale</span>
          </Link>
          <Link
            onClick={toggleMenu}
            to="/private/orderlist"
            className="px-1 h-[50px] flex items-center gap-2 py-6 rounded-2xl hover:bg-gray-100"
          >
            <CustomImage src="/images/menu_images/Notes.png" alt="" />
            <span className="pl-2">I miei ordini</span>
          </Link>
          <Link
            to="/"
            className="px-1 h-[50px] flex items-center gap-2 py-6 rounded-2xl hover:bg-gray-100"
          >
            <CustomImage src="/images/menu_images/Logout.png" alt="" />
            <span className="pl-2">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
