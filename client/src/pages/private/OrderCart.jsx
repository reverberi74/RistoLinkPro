import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderItem from "../../components/shared/orderItem";
/**
 * Componente che visualizza lo stato corrente dell’ordine dell’utente.
 * - Mostra i piatti ordinati e il loro stato (in preparazione, servito).
 * - Permette il pagamento in app o il ritorno al menù.
 */
const OrderCart = () => {
  const navigate = useNavigate();

  /**
   * Estrae dal Redux store l’elenco dei piatti ordinati.
   * @type {Array<{
   *   _id: string,
   *   title: string,
   *   price: string | number,
   *   quantity: number,
   *   status: "preparing" | "served"
   * }>}
   */
  const { items } = useSelector((state) => state.order);

  /**
   * Calcola il subtotale dell’ordine sommando (prezzo × quantità) per ogni piatto.
   * Il prezzo può essere stringa o numero, quindi viene convertito con parseFloat.
   * Se il prezzo o la quantità non sono validi, si assume zero.
   * @type {number}
   */
  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = item.quantity || 0;
    return sum + price * qty;
  }, 0);

  // Calcoli aggiuntivi
  const tasse = subtotal * 0.1; // 10% di tasse
  const servizio = 2; // Servizio fisso
  const totale = subtotal + tasse + servizio; // Totale finale

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
        {items.length === 0 ? (
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
          <div className="w-full mt-4 relative pb-24">
            {/* PAGA IN APP */}
            <div className="flex mb-4 px-2">
              <div className="flex justify-between mb-1 w-full item-center bg-[#DADBF1] rounded-3xl px-4 py-4">
                <span className="tracking-wide text-xs cursor-pointer text-gray-600 px-1 mt-2.5 text-nowrap"
                  onClick={() => navigate("/private/payments")}>
                  Paga in modo più intelligente
                </span>
                <button
                  onClick={() => navigate("/private/payments")}
                  className="bg-[#FFFFFF] text-black cursor-pointer justify-self-end px-4 py-2 rounded-full text-sm shadow-elevation-1"
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

            {/* RIEPILOGO TOTALE */}
            <div className="text-sm pb-10 text-gray-600 px-1 mt-2">
              <div className="flex justify-between mb-1">
                <span>Subtotale:</span>
                <span>{subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Tasse:</span>
                <span>{tasse.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Servizio:</span>
                <span>{servizio.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between font-semibold text-[#111827] text-base mt-2">
                <span>Totale:</span>
                <span>{totale.toFixed(2)}€</span>
              </div>
            </div>

            {/* FOOTER FISSO Bottone TORNA AL MENU */}
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
