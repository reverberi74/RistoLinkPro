import { fetchCart, clearCartDB } from '../../store/actions/cartActions';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, updateCartStatus } from '../../store/slices/cartSlice';
import CartItem from '../../components/shared/CartItem';
import { useToast } from '../../hooks/useToast';
import CartEmpty from './CartEmpty';
import BackButton from '../../components/shared/BackButton';
import axios from '../../api/axiosInstance';


/**
 * Pagina del carrello che mostra l'elenco dei prodotti selezionati dall'utente.
 *
 * - Permette di modificare le quantità (+ / −) o rimuovere articoli singolarmente.
 * - Calcola automaticamente il totale, le tasse (10%) e il costo servizio.
 * - Permette l'invio dell'ordine, svuotando il carrello e mostrando un toast di conferma.
 *
 * Utilizza Redux per gestire lo stato del carrello.
 */
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const items = cart.items;
  useEffect(() => {
    if (user?._id) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);





  /**
   * Calcolo del subtotale: somma di (prezzo * quantità) per ogni articolo.
   * parseFloat evita problemi in caso di prezzo stringa o assente. (NaN, null, undefined)
   * Estraiamo la quantità dell’articolo. Se non esiste o è falsy,
   * la impostiamo a 0. Anche qui evitiamo errori o moltiplicazioni errate.
   * Calcoliamo il costo totale per quell’articolo (prezzo × quantità) e lo
   * aggiungiamo al sum corrente. Questo viene fatto per ogni elemento dell’array.
   * 0); è il valore iniziale di sum, cioè il punto di partenza per l'accumulatore.
   * Alla fine del reduce, subtotal conterrà il totale parziale di tutti i prodotti (prima di tasse e servizi).
   */
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = parseFloat(item.price) || 0;
    const itemQty = item.quantity || 0;
    return sum + itemPrice * itemQty;
  }, 0);

  // Calcoli aggiuntivi
  const tasse = subtotal * 0.1; // 10% di tasse
  const servizio = 2; // Servizio fisso
  const totale = subtotal + tasse + servizio; // Totale finale

  /**
   * Gestione invio ordine:
   * - Mostra il toast.
   * - Pulisce il carrello.
   * - Dopo 2 secondi, naviga alla pagina /categories.
   */
  const tableNumber = useSelector((state) => state.tableClient.tableNumber);

  const handleSubmitOrder = async () => {
    if (items.length === 0) return;
    const orderData = {
      items,
      subtotal,
      taxes: tasse,
      service: servizio,
      tip: 0,
      total: totale,
      tableNumber: tableNumber || null, // 👈 Aggiunto
    };

    try {
      if (!token) throw new Error("Token mancante");

      await axios.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Il tuo ordine è stato inviato!");
      navigate("/private/order-cart");
    } catch (err) {
      toast.error("Errore nell'invio dell'ordine");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white mx-auto max-w-[23.4375rem] w-full font-sans">
      {/* HEADER */}
      <div className="flex pt-4 pl-4 pb-5 pr-3 items-center bg-white w-[23.4375rem] gap-5 relative">
        <BackButton />
        <h1 className="w-full font-semibold text-md">Riepilogo ordine</h1>
        <img
          src="/images/cv.jpg"
          alt="Svuota carrello"
          className="w-8 h-8 absolute right-4 top-5 cursor-pointer bg-white object-contain"
          onClick={() => dispatch(clearCartDB())}
        />
      </div>

      {/* CONTENUTO */}
      <div className="flex flex-col items-center w-[375px] px-4 pb-24 rounded-t-3xl bg-white w-full h-10"
        style={{ boxShadow: "0 -3px 12px -5px rgba(0, 0, 0, 0.18)" }}>
        {items.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="w-full mt-4 relative pb-24">
            {/* ITEMS */}
            {items.map((item) => (
              <CartItem item={item} key={item._id} />
            ))}

            {/* RIEPILOGO TOTALE */}
            <div className="text-sm text-gray-600 px-1 pb-10 mt-2">
              <div className="flex justify-between mb-1"><span>Subtotale:</span><span>{subtotal.toFixed(2)}€</span></div>
              <div className="flex justify-between mb-1"><span>Tasse (10%):</span><span>{tasse.toFixed(2)}€</span></div>
              <div className="flex justify-between mb-1"><span>Servizio:</span><span>{servizio.toFixed(2)}€</span></div>
              <div className="flex justify-between font-semibold text-[#111827] text-base mt-2">
                <span>Totale:</span><span>{totale.toFixed(2)}€</span>
              </div>
            </div>

            {/* FOOTER FISSO */}
            <div className="fixed bottom-0 py-6 left-[50%] w-full bg-white pt-4 flex justify-center z-0"
              style={{ transform: 'translateX(-50%)' }}>
              <button
                onClick={handleSubmitOrder}
                disabled={items.length === 0}
                className={`bg-[#3BC8E1] text-white text-[15px] mb-6 font-semibold flex items-center justify-center rounded-full shadow-md transition
                                    ${items.length === 0 ? 'bg-[#A0DDE6] cursor-not-allowed' : ''}`}
                style={{
                  width: '273px',
                  height: '39px'
                }}
              >
                <img src="/images/Pluswhite.svg" alt="plus" className='w-5 h-5' />
                <span className='pl-3 cursor-pointer'>Invia ordine</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
