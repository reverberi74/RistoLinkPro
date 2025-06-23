import React from "react";

const TableItem = ({ table, expanded, toggleExpand }) => {
  return (
    <div key={table.orderId}>
      {/* Riga principale */}
      <div
        className={`grid grid-cols-5 cursor-pointer items-center mt-2 py-2 max-w-[972px] w-full ${
          table.status === "Pagato" ? "bg-[#EBF9EE]" : "bg-[#F9F9F9]"
        }`}
        onClick={() => toggleExpand(table.orderId)}
      >
        <div className="justify-self-center">{table.tableNumber}</div>
        <div className="justify-self-center">{table.time}</div>
        <div className="justify-self-center">{table.total}</div>
        <div className="justify-self-center">{table.tip}</div>

        <div
          className={`w-[90px] h-[36px] flex items-center justify-center px-2 ml-10 rounded-full text-white font-bold text-sm transition-colors ${
            table.status === "Pagato" ? "bg-[#34C759]" : "bg-[#FF9500]"
          }`}
        >
          {table.status}
        </div>
      </div>

      {/* Riga espansa */}
      {expanded === table.orderId && table.items?.length > 0 && (
        <div className="max-w-[972px] w-full px-12 py-6.25 text-sm text-gray-700 bg-white">
          <ul className="mb-2 space-y-1">
            {table.items.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>{table.subtotal}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Servizio</span>
            <span>{table.service}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Totale</span>
            <span>{table.total}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableItem;
