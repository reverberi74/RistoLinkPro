import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomImage from "../../components/shared/CustomImage";
import { useDispatch, useSelector } from "react-redux";

import { updateCurrentsLabel } from "../../store/slices/labelSlice";

const FiltersPopUp = ({ onClick }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isMenuPage = location.pathname === "/dashboard/menu";

  const { all: filtersArray, currents: currentsArray } = useSelector(
    (state) => state.labels
  );

  const greenFiltersArray = ["Vegano", "Vegetariano"];

  const getActiveStatus = (label) => {
    return currentsArray.find((item) => item._id == label._id);
  };

  const handleSetFilter = (label) => {
    dispatch(updateCurrentsLabel(label));
  };

  return (
    <div
      className={`w-[313px] h-[425px] p-4 shadow-elevation-1 p-6 rounded-2xl relative bg-white ${
        isMenuPage ? "" : "h-[490px] p-6"
      }`}
    >
      <div>
        {!isMenuPage && (
          <button
            onClick={onClick}
            className="absolute cursor-pointer top-2 right-2 w-8 h-8 bg-white flex justify-center items-center"
          >
            <svg
              className="w-6 h-6 p-1 border-1 rounded-full"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9353 13.0002L25.5992 2.33628C26.1336 1.80186 26.1336 0.93543 25.5992 0.40106C25.0648 -0.133361 24.1983 -0.133361 23.664 0.40106L13 11.065L2.33603 0.40106C1.80161 -0.133361 0.935186 -0.133361 0.400816 0.40106C-0.133554 0.935481 -0.133605 1.80191 0.400816 2.33628L11.0648 13.0002L0.400816 23.6642C-0.133605 24.1986 -0.133605 25.065 0.400816 25.5994C0.935237 26.1338 1.80166 26.1338 2.33603 25.5994L13 14.9354L23.6639 25.5994C24.1983 26.1338 25.0648 26.1338 25.5991 25.5994C26.1335 25.065 26.1335 24.1985 25.5991 23.6642L14.9353 13.0002Z"
                fill="#332B2C"
              />
            </svg>
          </button>
        )}
        <h2 className={`font-bold ${isMenuPage ? "pt-0 pb-6" : "py-6"}`}>
          {isMenuPage ? "Allergeni" : "Allergeni da evitare"}
        </h2>
        <div className="flex flex-wrap gap-3 cursor-pointer">
          {filtersArray
            .filter((item) => !greenFiltersArray.includes(item.name))
            .map((filter, index) => (
              <div
                key={index}
                className="bg-[#070FA326] flex py-2 px-3 rounded-full gap-2 text-[14px]"
                style={{
                  background: getActiveStatus(filter) ? "#070FA3" : "",
                }}
                onClick={() => {
                  handleSetFilter(filter);
                }}
              >
                <CustomImage
                  src={getActiveStatus(filter) ? filter.img_2 : filter.img_1}
                  className="w-[20px] h-[20px]"
                />
                <span
                  style={{ color: getActiveStatus(filter) ? "white" : "" }}
                >
                  {filter.name}
                </span>
              </div>
            ))}
        </div>
      </div>

      <div>
        <h2 className="py-6 font-bold">
          {isMenuPage ? "Piatto vegan o veggi" : "Piatti vegan e veggie"}
        </h2>
        <div className="flex flex-wrap gap-3 cursor-pointer">
          {filtersArray
            .filter((item) => greenFiltersArray.includes(item.name))
            .map((filter, index) => (
              <div
                key={index}
                className="bg-[#070FA326] flex py-2 px-3 rounded-full gap-2 text-[14px]"
                style={{
                  background: getActiveStatus(filter) ? "#070FA3" : "",
                }}
                onClick={() => handleSetFilter(filter)}
              >
                <CustomImage
                  src={getActiveStatus(filter) ? filter.img_2 : filter.img_1}
                  className="w-[20px] h-[20px]"
                />
                <span
                  style={{ color: getActiveStatus(filter) ? "white" : "" }}
                >
                  {filter.name}
                </span>
              </div>
            ))}
        </div>
      </div>

      {!isMenuPage && (
        <div>
          <button onClick={onClick} className="w-full bg-[#3BC8E1] h-[39px] rounded-3xl text-white text-[16px] flex items-center justify-center gap-2 mt-10">
            Applica filtri
          </button>
        </div>
      )}
    </div>
  );
};

export default FiltersPopUp;