import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateOrderItemStatus } from "../../store/slices/dashboard/businessOrderSlice";
import OrderItemInDashboard from "../../components/shared/dashboard/OrderItemInDashboard";
import { useApi } from "../../hooks/useApi";

const OrderDashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.dashboardOrders.orders);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { put } = useApi();
   

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await dispatch(getAllOrders()).unwrap();
      } catch (error) {
        console.error("Errore nel recupero degli ordini:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [dispatch]);

  const toggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleGlobalSwitch = async (order) => {

    const newStatus = order.items.some(item => item.status === "preparing")
      ? "served"
      : "preparing";

    for (const item of order.items) {
      try {
        // Aggiorna Redux
        await dispatch(
          updateOrderItemStatus({
            orderId: order._id,
            itemId: item._id,
            status: newStatus,
          })
        );

        // Aggiorna DB
        await put(`/orders/${order._id}/item/${item._id}`, { status: newStatus });

      } catch (err) {
        console.error("Errore aggiornamento piatto:", err);
      }
    }

    // Dopo aver aggiornato tutti i piatti, aggiorna la lista degli ordini
    await dispatch(getAllOrders());
  };

  return (
    <div className="bg-white max-w-[972px] w-full mx-auto px-4 mt-12">

      {/* Intestazione */}
      <div className="grid grid-cols-4 font-semibold text-gray-700 bg-[#EBEBEB] rounded-tl-2xl rounded-tr-2xl px-4 py-3">
        <div className="justify-self-center">Tavolo</div>
        <div className="justify-self-center">Utente</div>
        <div className="justify-self-center">Data</div>
        <div className="justify-self-center">Stato</div>
      </div>

      {loading ? (
        <p className="text-center mt-10">Caricamento ordini...</p>
      ) : Array.isArray(orders) && orders.length === 0 ? (
        <p className="text-center mt-10">Nessun ordine attivo.</p>
      ) : (
        orders.map((order) => {
          const isExpanded = expandedOrderId === order._id;
          const createdAt = new Date(order.createdAt).toLocaleString("it-IT", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div key={order._id}>
              {/* Riga ordine */}
              <div
                className={`grid grid-cols-4 items-center mt-2 py-2 cursor-pointer ${order.items.every((item) => item.status === "served")
                  ? "bg-[#EBF9EE]"
                  : "bg-[#F9F9F9]"
                  }`}
                onClick={() => toggleExpand(order._id)}
              >
                <div className="justify-self-center">{order.tableNumber || "-"}</div>
                <div className="justify-self-center">
                  {order.userId?.first_name} {order.userId?.last_name}
                </div>
                <div className="justify-self-center">{createdAt}</div>
                <div
                  className="justify-self-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGlobalSwitch(order);
                  }}
                >
                  <div
                    className={`w-[140px] h-[36px] flex items-center px-3 rounded-full cursor-pointer text-white font-bold text-sm transition-colors justify-between ${order.items.every((item) => item.status === "served")
                      ? "bg-[#34C759]"
                      : "bg-[#FF9500]"
                      }`}
                  >
                    {order.items.every((item) => item.status === "served") ? (
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
              </div>

              {/* Piatti espansi */}
              {isExpanded && order.items.length > 0 && (
                <div className="max-w-[972px] w-full px-12 py-4 text-sm text-gray-700 bg-white">
                  {order.items.map((item) => (
                    <OrderItemInDashboard
                      key={item._id}
                      item={item}
                      orderId={order._id}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrderDashboard;
