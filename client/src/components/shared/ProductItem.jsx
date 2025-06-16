import React, { useState } from "react";
import CustomImage from "./CustomImage";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/useToast";
import { addToCart } from "../../store/slices/cartSlice";


const ProductItem = ({ onSelectProduct, product }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [count, setCount] = useState(0); // Stato per la quantità da aggiungere
  const itemInCart = cartItems.find((item) => item._id === product._id);
  console.log(itemInCart);

  const handleAddToCart = () => {
    setCount((c) => c + 1);
    dispatch(addToCart(product)); // Aggiunge al carrello
    toast.success("Il tuo piatto è stato aggiunto");
  };

  return (
    <>
      <div
        key={product._id}
        className=" bg-white max-w-[375px] w-full rounded  cursor-pointer flex space-between justify-center  py-1"
      >
        <CustomImage
          onClick={onSelectProduct}
          src={product.image}
          alt={product.name}
          className="w-[90px] h-[90px] rounded-2xl object-cover"
        />
        <div className="pl-3 pr-5 min-w-[192px]" onClick={onSelectProduct}>
          <h3 className="font-bold text-[16px]">{product.name}</h3>
          <p className="text-[12px]">{product.description}</p>
        </div>
        <div className="flex flex-col  min-w-[35px] h-[80px] justify-between items-center">
          <p className="text-sm font-bold" onClick={onSelectProduct}>
            {product.price} €
          </p>
          <div className="flex w-auto items-center justify-end gap-1">
            <div className="w-[16px] h-[16px]">
              {itemInCart && (
                <div className="bg-primary w-[16px] h-[16px] text-[13px] p-2.3 flex items-center justify-center text-white rounded-full">
                  {itemInCart.quantity}
                </div>
              )}
            </div>
            <img
              onClick={handleAddToCart}
              src=" /images/Plus.svg"
              alt="logo"
              className="w-[26px] h-[26px]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <div className="flex w-[295px] border-b border-b-gray-300 my-4"></div>
      </div>
    </>
  );
};

export default ProductItem;
