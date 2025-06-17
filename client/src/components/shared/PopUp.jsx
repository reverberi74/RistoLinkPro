import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCartDB } from "../../store/actions/cartActions";
import CustomImage from "./CustomImage";
import { useToast } from "../../hooks/useToast";

/**
 * PopUp - Modale che mostra i dettagli di un piatto e consente di aggiungerlo al carrello
 * @param {object} product - Dati completi del prodotto
 * @param {function} onClose - Funzione per chiudere il popup
 * @param {boolean} showActions - Se true mostra quantità + bottone
 */
const PopUp = ({ onClose, product, showActions = true }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [count, setCount] = useState(1);

  const { image, description, name: title, price } = product;

  const handleAddToCart = () => {
    dispatch(addToCartDB({ ...product, quantity: count }));
    onClose();
    toast.success("Il tuo piatto è stato aggiunto");
  };

  return (
    <div className="bg-white w-[313px] pb-8 border-b border-b-gray-400 flex flex-col justify-center relative rounded-2xl">
      {/* Immagine e chiusura */}
      <div>
        <CustomImage
          src={image}
          alt={title}
          className="h-[217px] min-w-full rounded-t-2xl object-cover"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white flex justify-center items-center"
        >
          <svg className="w-2.5 h-2.5" viewBox="0 0 26 26" fill="none">
            <path
              d="M14.9353 13.0002L25.5992 2.33628C26.1336 1.80186 26.1336 0.93543 25.5992 0.40106C25.0648 -0.133361 24.1983 -0.133361 23.664 0.40106L13 11.065L2.33603 0.40106C1.80161 -0.133361 0.935186 -0.133361 0.400816 0.40106C-0.133554 0.935481 -0.133605 1.80191 0.400816 2.33628L11.0648 13.0002L0.400816 23.6642C-0.133605 24.1986 -0.133605 25.065 0.400816 25.5994C0.935237 26.1338 1.80166 26.1338 2.33603 25.5994L13 14.9354L23.6639 25.5994C24.1983 26.1338 25.0648 26.1338 25.5991 25.5994C26.1335 25.065 26.1335 24.1985 25.5991 23.6642L14.9353 13.0002Z"
              fill="#332B2C"
            />
          </svg>
        </button>
      </div>

      {/* Contenuto testuale */}
      <div className="px-5">
        <h2 className="font-bold text-[16px] my-6">{title}</h2>
        <p className="text-[12px]">{description} <b className="text-[#818181]">Read More</b></p>

        <div className="mt-3 mb-3">
          <p>Filters</p>
        </div>

        <p className="text-[12px] text-[#B3ADAD] mb-3">Aggiungi nota +</p>

        {showActions && (
          <>
            <div className="flex justify-between items-center">
              <p className="text-[13px]">
                <span className="text-[12px]">Prezzo :</span> {price} €
              </p>

              <div className="flex gap-3 items-center w-[94px]">
                <div className="min-w-[33px] h-[33px]">
                  {count > 1 && (
                    <img
                      onClick={() => setCount((c) => c - 1)}
                      src="/images/MinusSign.png"
                      alt="minus"
                      className="w-[33px] h-[33px] cursor-pointer"
                    />
                  )}
                </div>
                <span>{count}</span>
                <img
                  onClick={() => setCount((c) => c + 1)}
                  src="/images/PlusSign.png"
                  alt="plus"
                  className="w-[33px] h-[33px] cursor-pointer"
                />
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-[#3BC8E1] h-[39px] rounded-3xl text-white text-[16px] flex items-center justify-center gap-2 mt-10"
            >
              <img
                src="/images/Pluswhite.svg"
                alt="plus"
                className="w-[20px] h-[20px]"
              />
              Aggiungi all'ordine
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PopUp;
