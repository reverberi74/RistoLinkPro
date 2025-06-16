import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProduct } from "../../store/slices/productSlice";
import PopUp from "../../components/shared/PopUp";

const CustomProductModal = () => {
  const dispatch = useDispatch();
  const { current: selectedProduct } = useSelector((state) => state.products);

  const handleCloseModal = () => {
    dispatch(setCurrentProduct(null));
  };

  return (
    <>
      {selectedProduct && (
        <div className="absolute flex justify-center items-center top-0 left-0 h-full w-screen bg-[#00000061]">
          <PopUp
            product={selectedProduct}
            onClose={handleCloseModal}
          />
        </div>
      )}
    </>
  );
};

export default CustomProductModal;
