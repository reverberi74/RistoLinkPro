import { Link } from "react-router-dom";
import CustomImage from "../shared/CustomImage";

const NavbarBusinessLogin = () => {
  return (
    <nav className="flex gap-2 w-full bg-white shadow-md p-2 h-[100px] items-center justify-center">
      <div className="max-w-[1440px] flex justify-end w-full items-center">
        <Link to="/business">
          <CustomImage
            src="/images/business_images/Logo-TableLink.jpg"
            className="h-[80px] w-[174.12px]"
          />
        </Link>
      </div>
    </nav>
  );
};

export default NavbarBusinessLogin;