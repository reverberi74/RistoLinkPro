import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { setCurrentProduct } from '../../store/slices/productSlice';
import CustomImage from './CustomImage';

/**
 * Componente che rappresenta un singolo prodotto nel carrello.
 * 
 * Permette all'utente di:
 * - Aumentare o diminuire la quantità del prodotto.
 * - Rimuovere completamente il prodotto dal carrello.
 * 
 * Tutte le azioni aggiornano lo stato globale di Redux tramite il cartSlice.
 * 
 * @param {Object} props - Proprietà del componente.
 * @param {string} props._id - ID univoco del prodotto.
 * @param {string} props.name - Nome del prodotto.
 * @param {number} props.price - Prezzo unitario del prodotto.
 * @param {number} props.quantity - Quantità del prodotto nel carrello.
 * @param {string} props.image - Percorso o URL dell'immagine del prodotto.
 */
const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const { _id, quantity } = item;

    /**
     * Aumenta la quantità del prodotto di 1 unità.
     * Usa updateQuantity perché deve sovrascrivere il valore esatto,
     * non sommare come farebbe addToCart.
     */
    const handleIncrease = () => {
        dispatch(updateQuantity({ _id, quantity: quantity + 1 }));
    };

    /**
     * Diminuisce la quantità del prodotto.
     * Se la quantità diventa 0, rimuove l'articolo dal carrello.
     */
    const handleDecrease = () => {
        if (quantity > 1) {
            dispatch(updateQuantity({ _id, quantity: quantity - 1 }));
        } else {
            dispatch(removeFromCart({ _id }));
        }
    };

    /**
     * Rimuove completamente il prodotto dal carrello.
     */
    const handleRemove = () => {
        dispatch(removeFromCart({ _id }));
    };

    const selectCurrentProduct = (product) => {
        dispatch(setCurrentProduct(product));
    }

    return (
        <div key={item._id} className="relative flex bg-white cursor-pointer mb-3 p-3 rounded-xl shadow-sm border border-gray-100">
            {/* Immagine */}
            <CustomImage
                onClick={() => selectCurrentProduct(item)}
                src={item.image}
                alt={item.name}
                className="w-[88px] h-[88px] rounded-xl object-cover"
            />

            {/* Contenuto a destra */}
            <div className="flex flex-col justify-between flex-1 ml-3 relative">
                {/* Titolo + descrizione */}
                <div>
                    <h3
                        onClick={() => selectCurrentProduct(item)}
                        className="cursor-pointer font-semibold text-sm text-[#111827] line-clamp-2 pr-6"
                    >
                        {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-1">Lorem ipsum dolor sit amet...</p>
                </div>

                {/* Riga con prezzo + quantità */}
                <div className="flex items-center justify-between mt-2">
                    {/* Prezzo a sinistra */}
                    <p className="text-sm font-medium text-[#111827]">
                        {parseFloat(item.price).toFixed(2)} €
                    </p>

                    {/* Bottoni quantità */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDecrease}
                            className="w-6 h-6 cursor-pointer rounded-full bg-[#F3F3F3] text-black font-bold text-sm"
                        >−</button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <button
                            onClick={handleIncrease}
                            className="w-6 h-6 cursor-pointer rounded-full bg-[#F3F3F3] text-black font-bold text-sm"
                        >+</button>
                    </div>
                </div>

                {/* Icona rimuovi in alto a destra */}
                <button
                    onClick={handleRemove}
                    className="absolute cursor-pointer top-[-6px] right-[-8px]"
                >
                    <img
                        src="/images/croce-azzurra.jpg" 
                        alt="Rimuovi"
                        className="w-6 h-6"
                    />
                </button>
            </div>
        </div>
    );
};

export default CartItem;