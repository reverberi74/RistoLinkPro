import React from 'react';
import CustomImage from './CustomImage';

/**
 * Componente che mostra un singolo piatto all'interno della pagina OrderCart.
 *
 * Funzionalità principali:
 * - Visualizza immagine, nome, prezzo e stato reale del piatto.
 * - Mostra un popup informativo (es. dettagli del piatto) se desiderato.
 * - Mostra quantità accanto allo stato solo se >1 e in preparazione.
 *
 * @param {{
 *   item: {
 *     _id: string,
 *     name: string,
 *     image: string,
 *     price: string | number,
 *     quantity: number,
 *     status: "preparing" | "served"
 *   }
 * }} props
 */
const OrderItem = ({ item }) => {
  const statusLabel = item.status === 'served' ? 'Servito' : 'In preparazione';
  const statusColor = item.status === 'served' ? 'text-green-500' : 'text-[#3BC8E1]';
  const statusIcon = item.status === 'served' ? '/images/servito.gif' : '/images/preparing.gif';

  return (
    <div className="bg-white mb-4 p-3 rounded-2xl shadow-sm flex gap-4 relative">
      {/* Icona stato */}
      <img src={statusIcon} alt={statusLabel} className="absolute top-2 mt-2.5 right-2 w-8 h-8" />

      {/* Immagine piatto */}
      <CustomImage
        src={item.image}
        alt={item.name}
        className="w-[88px] h-[88px] rounded-2xl object-cover"
      />

      {/* Dettagli */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-semibold text-base text-[#111827] pr-6 line-clamp-2">
            {item.name}
          </h3>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm font-medium text-gray-700">
            {(parseFloat(item.price) * item.quantity).toFixed(2)}€
          </p>
          <div className="flex items-center gap-1">
            <p className={`text-sm ${statusColor}`}>{statusLabel}</p>
            {item.status === 'preparing' && item.quantity > 1 && (
              <span className="mb-1 text-xs text-[#3BC8E1]">(x{item.quantity})</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
