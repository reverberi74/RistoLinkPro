import { useLocation, useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <img
      className="cursor-pointer"
      src="/images/Component1.svg"
      alt="arrow"
      onClick={() =>
        navigate(location.key == "default" ? "/private/categories" : -1)
      }
    />
  );
};

export default BackButton;
