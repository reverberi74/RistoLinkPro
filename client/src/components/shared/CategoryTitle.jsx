import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCurrentCategory } from "../../store/slices/categorySlice";
import BackButton from "./BackButton";

const CategoryTitle = ({ onOpenFilter }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const { all: categories, current: activeCategory } = useSelector(
    (state) => state.categories
  );

  if (!activeCategory) {
    const currentCategory = categories.find(
      (item) => item._id == params.category_id
    );
    if (currentCategory) dispatch(setCurrentCategory(currentCategory));
  }

  return (
    <div className="flex pt-4 pl-4 pb-4 pr-3 items-center bg-white w-[375px] gap-4">
      <BackButton />
      <h1 className="w-full font-semibold text-[18px]">
        {activeCategory && activeCategory.name}
      </h1>
      <img
        src="/images/Slider.jpg"
        alt="slider"
        className="cursor-pointer w-[26px] h-[26px]"
        onClick={onOpenFilter}
      />
    </div>
  );
};

export default CategoryTitle;
