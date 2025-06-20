import React, { useState } from "react";
import OrderItemInDashboard from "./OrderItemInDashboard";
import { useDispatch } from "react-redux";
import { updateOrderItemStatus } from "../../../store/slices/dashboard/businessOrderSlice";
import { useApi } from "../../../hooks/useApi";

/**
 * @param {{ order: Object }} props
 */
const OrderDashboardItem = ({ order }) => {
  console.log("📁 Sto leggendo OrderDashboardItem da: components/shared/dashboard/OrderDashboardItem.jsx");
  console.log("eccomi");
  console.log("🔍 Render ordine:", order._id);
  alert("OrderDashboardItem ATTIVO");
  const dispatch = useDispatch();
  const { put } = useApi();
  const [expanded, setExpanded] = useState(false);

  const allServed = order.items.every((item) => item.status === "served");

  // Debug temporaneo per controllare gli status
  console.log("✅ allServed:", allServed);
  console.log("✅ Stato piatti:", order.items.map(i => i.status));

  const handleToggleAll = async (e) => {
    e.stopPropagation(); // Impedisce espansione cliccando sullo switch
    const newStatus = allServed ? "preparing" : "served";

    for (const item of order.items) {
      try {
        await put(`/orders/${order._id}/item/${item._id}`, { status: newStatus });
        dispatch(updateOrderItemStatus({ orderId: order._id, itemId: item._id, status: newStatus }));
      } catch (error) {
        console.error("Errore aggiornamento stato item:", error);
      }
    }
  };

  return (
    <div>
      {/* Riga principale ordine */}
      <div
        className="grid grid-cols-4 items-center mt-2 py-2 max-w-[972px] w-full cursor-pointer bg-[#F9F9F9]"
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className="justify-self-center">{order.tableNumber || "-"}</div>
        <div className="justify-self-center">
          {order.userId?.first_name} {order.userId?.last_name}
        </div>
        <div className="justify-self-center">
          {new Date(order.createdAt).toLocaleString("it-IT", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        {/* Switch Generale */}
        <div
          onClick={handleToggleAll}
          className={`w-[110px] h-[36px] flex items-center px-2 rounded-full cursor-pointer text-white font-bold text-sm transition-colors ${allServed ? "bg-[#34C759]" : "bg-[#FF9500]"}`}
        >
          {allServed ? (
            <>
              <span className="flex-1 text-center">Servito</span>
              <div className="w-4 h-4 rounded-full bg-white ml-1 transition-all" />
            </>
          ) : (
            <>
              <div className="w-4 h-4 rounded-full bg-white mr-1 transition-all" />
              <span className="flex-1 text-center">Preparazione</span>
            </>
          )}
        </div>
      </div>

      {/* Espansione: piatti */}
      {expanded && order.items.length > 0 && (
        <div className="max-w-[972px] w-full px-12 py-4 text-sm text-gray-700 bg-[#FFFFFF]">
          {order.items.map((item) => (
            <OrderItemInDashboard key={item._id} item={{ ...item, orderId: order._id }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDashboardItem;
