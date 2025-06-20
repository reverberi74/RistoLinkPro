import React from "react";
import { useDispatch } from "react-redux";
import { updateOrderItemStatus } from "../../../store/slices/dashboard/businessOrderSlice";
import { getAllOrders } from "../../../store/slices/dashboard/businessOrderSlice";
import { useApi } from "../../../hooks/useApi";

const OrderItemInDashboard = ({ item, orderId }) => {
  const dispatch = useDispatch();
  const { put } = useApi();

  const handleToggle = async (e) => {
    e.stopPropagation();
    const newStatus = item.status === "preparing" ? "served" : "preparing";
    dispatch(updateOrderItemStatus({ orderId, itemId: item._id, status: newStatus }));

    try {
      await put(`/orders/${orderId}/item/${item._id}`, { status: newStatus });
      await dispatch(getAllOrders()); // 🔁 Ricarica gli ordini
    } catch (err) {
      console.error("Errore aggiornamento piatto:", err);
    }
  };

  return (
    <div className="flex justify-between items-center py-2 px-4 text-sm border-b border-gray-200">
      {/* Nome + quantità in parentesi */}
      <div className="text-gray-800">
        {item.name}
        {item.quantity > 1 && (
          <span className="text-gray-500 text-sm ml-2">(x{item.quantity})</span>
        )}
      </div>

      {/* Switch a destra, ben allineato */}
      <div
        onClick={handleToggle}
        className={`w-[140px] h-[36px] flex items-center px-3 rounded-full cursor-pointer text-white font-bold text-sm transition-colors ${item.status === "served" ? "bg-[#34C759]" : "bg-[#FF9500]"
          }`}
      >
        {item.status === "served" ? (
          <>
            <span className="flex-1 text-center">Servito</span>
            <div className="w-4 h-4 rounded-full bg-white ml-2 transition-all" />
          </>
        ) : (
          <>
            <div className="w-4 h-4 rounded-full bg-white mr-2 transition-all" />
            <span className="flex-1 text-center">Preparazione</span>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderItemInDashboard;
