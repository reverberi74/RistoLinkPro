import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentProduct } from '../../store/slices/productSlice';
import CustomImage from './CustomImage';
import { updateQuantityDB, removeFromCartDB } from '../../store/actions/cartActions';

/**
 * Componente che rappresenta un singolo prodotto nel carrello.
 */
const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const { _id, quantity } = item;

    const handleIncrease = () => {
        dispatch(updateQuantityDB(_id, quantity + 1));
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            dispatch(updateQuantityDB(_id, quantity - 1));
        } else {
            dispatch(removeFromCartDB(_id));
        }
    };

    const handleRemove = () => {
        dispatch(removeFromCartDB(_id)); // ✅ corregge rimozione anche da backend
    };

    const selectCurrentProduct = (product) => {
        dispatch(setCurrentProduct(product));
    };

    return (
        <div key={item._id} className="relative flex bg-white cursor-pointer mb-3 p-3 rounded-xl shadow-sm border border-gray-100">
            {/* Immagine */}
            <CustomImage
                onClick={() => selectCurrentProduct(item)}
                src={item.image}
                alt={item.name}
                className="w-[88px] h-[88px] rounded-xl object-cover"
            />

            {/* Contenuto */}
            <div className="flex flex-col justify-between flex-1 ml-3 relative">
                {/* Titolo */}
                <div>
                    <h3
                        onClick={() => selectCurrentProduct(item)}
                        className="cursor-pointer font-semibold text-sm text-[#111827] line-clamp-2 pr-6"
                    >
                        {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-1">Lorem ipsum dolor sit amet...</p>
                </div>

                {/* Prezzo + quantità */}
                <div className="flex items-center justify-between mt-2">
                    <p className="text-sm font-medium text-[#111827]">
                        {parseFloat(item.price).toFixed(2)} €
                    </p>
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

                {/* Rimozione */}
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
