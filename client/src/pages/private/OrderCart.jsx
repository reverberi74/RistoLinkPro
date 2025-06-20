import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import OrderItem from "../../components/shared/orderItem";
import { fetchActiveOrder, markOrderAsPaid } from "../../store/slices/orderSlice";

const OrderCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {
    items = [],
    subtotal = 0,
    taxes = 0,
    service = 0,
    total = 0,
    status,
    error,
  } = useSelector((state) => state.order);

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const allServed = items.every((item) => item.status === "served");

  useEffect(() => {
    if (!user?._id || !token) return;

    const fetchOrder = () => {
      dispatch(fetchActiveOrder({ userId: user._id, token }));
    };

    fetchOrder(); // Primo fetch immediato

    const interval = setInterval(fetchOrder, 10000); // ogni 10s

    return () => clearInterval(interval); // pulizia all'unmount
  }, [dispatch, user, token]);

  /*const handleConfirmPayment = () => {
    if (!user?._id || !token) return;
    dispatch(markOrderAsPaid({ orderId: user._id, token }));
    navigate("/private/payments");
  };*/

  return (
    <div className="flex flex-col items-center justify-center bg-white mx-auto max-w-[23.4375rem] w-full font-sans">
      {/* HEADER */}
      <div className="flex pt-4 pl-4 pb-5 pr-3 items-center bg-white w-[23.4375rem] gap-5">
        <img
          className="cursor-pointer"
          src="/images/Component1.svg"
          alt="arrow"
          onClick={() => navigate("/private/categories")}
        />
        <h1 className="w-full font-semibold text-md">Riepilogo ordine</h1>
      </div>

      {/* CONTENUTO */}
      <div className="flex flex-col items-center w-[375px] px-4 pb-24 rounded-t-3xl bg-white w-full h-10">
        {status === "loading" ? (
          <div className="mt-20 text-gray-600">Caricamento ordine...</div>
        ) : error ? (
          <div className="mt-20 text-red-500">{error}</div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white w-full mt-20 text-center p-6 rounded-2xl shadow-sm">
            <img
              src="/images/empty-cart.jpg"
              alt="ordine vuoto"
              className="w-40 h-40 mb-4"
            />
            <p className="text-gray-500 text-base font-medium">
              Nessun ordine in corso
            </p>
            <button
              onClick={() => navigate("/private/categories")}
              className="mt-6 bg-[#3BC8E1] cursor-pointer text-white px-5 py-2 rounded-full text-sm font-medium"
            >
              Torna al menu
            </button>
          </div>
        ) : (
          <div className="w-full mt-4 relative pb-32">
            {/* INFO PAGA IN APP */}
            <div className="flex mb-4 px-2">
              <div className="flex justify-between mb-1 w-full items-center bg-[#DADBF1] rounded-3xl px-4 py-4">
                <span
                  className="tracking-wide text-xs text-gray-600 px-1 mt-2.5 text-nowrap"
                >
                  Paga in modo più intelligente
                </span>
                <button
                  onClick={() => allServed && navigate("/private/payments")}
                  disabled={!allServed}
                  className={`px-4 py-2 rounded-full text-sm shadow-elevation-1 ${allServed
                    ? "bg-white text-black cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  Paga in App
                </button>
              </div>
            </div>

            {/* ITEMS */}
            <div className="w-full mt-4">
              {items.map((item) => (
                <OrderItem item={item} key={item._id} />
              ))}
            </div>

            {/* RIEPILOGO */}
            <div className="text-sm pb-10 text-gray-600 px-1 mt-2">
              <div className="flex justify-between mb-1">
                <span>Subtotale:</span>
                <span>{subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Tasse:</span>
                <span>{taxes.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Servizio:</span>
                <span>{service.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between font-semibold text-[#111827] text-base mt-2">
                <span>Totale:</span>
                <span>{total.toFixed(2)}€</span>
              </div>
            </div>

            {/* FOOTER FISSO */}
            <div
              className="fixed bottom-0 py-6 left-[50%] w-full bg-white pt-4 flex justify-center z-40"
              style={{ transform: "translateX(-50%)" }}
            >
              <button
                onClick={() => navigate("/private/categories")}
                className="bg-[#3BC8E1] text-white text-[15px] cursor-pointer font-semibold flex items-center mb-6 justify-center rounded-full shadow-md"
                style={{
                  width: "273px",
                  height: "39px",
                }}
              >
                Torna al menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCart;
