import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrderItemStatus } from '../../store/slices/orderSlice';
import CustomImage from './CustomImage';
import PopUp from './PopUp';
/**
 * Componente che mostra un singolo piatto all'interno della pagina OrderCart.
 * 
 * Funzionalità principali:
 * - Visualizza immagine, nome, prezzo e stato (preparazione o servito) del piatto.
 * - Dopo 8 secondi, cambia automaticamente lo stato del piatto da "preparing" a "served".
 * - Apre un PopUp informativo cliccando su immagine o nome.
 * - Mostra la quantità accanto allo stato se > 1 e ancora in preparazione.
 * 
 * Stato interno:
 * @state {string} localStatus - Stato locale del piatto per controllare la transizione (inizialmente "preparing" o "served").
 * @state {boolean} showPopUp - Stato booleano che determina se mostrare il PopUp dettagliato del piatto.
 * 
 * Effetti:
 * - useEffect: avvia un timer di 8 secondi quando `item.status` è "preparing", poi cambia lo stato in "served".
 * 
 * Props:
 * @param {{ 
 *   item: {
 *     _id: string,               // ID univoco del piatto
 *     title: string,             // Nome completo del piatto (non usato direttamente qui)
 *     name: string,              // Nome visualizzato del piatto
 *     image: string,             // URL dell’immagine del piatto
 *     price: string | number,    // Prezzo unitario del piatto
 *     quantity: number,          // Quantità ordinata
 *     status: "preparing" | "served" // Stato iniziale del piatto
 *   }
 * }} props
 * 
 * Redux:
 * - Dispatcha l’azione `updateOrderItemStatus` per aggiornare lo stato di un piatto nello store globale.
 */
const OrderItem = ({ item }) => {
  const dispatch = useDispatch();
  const [localStatus, setLocalStatus] = useState(item.status);

  useEffect(() => {
    if (item.status === 'preparing') {
      const timer = setTimeout(() => {
        dispatch(updateOrderItemStatus({ _id: item._id, status: 'served' }));
        setLocalStatus('served');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [item._id, item.status, dispatch]);

  const statusLabel = localStatus === 'served' ? 'Servito' : 'In preparazione';
  const statusColor = localStatus === 'served' ? 'text-green-500' : 'text-[#3BC8E1]';
  const statusIcon = localStatus === 'served' ? '/images/servito.gif' : '/images/preparing.gif';

  return (
    <>
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
            <h3 className="font-semibold text-base text-[#111827] pr-6 line-clamp-2">{item.name}</h3>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm font-medium text-gray-700">
              {(parseFloat(item.price) * item.quantity).toFixed(2)}€
            </p>
            <div className="flex items-center gap-1">
              <p className={`text-sm ${statusColor}`}>{statusLabel}</p>
              {localStatus === 'preparing' && item.quantity > 1 && (
                <span className="mb-1 text-xs text-[#3BC8E1]">(x{item.quantity})</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
