//Presentational component - Visualizza un singolo tavolo e i dettagli ordinati
import React from "react";
import { useDispatch } from "react-redux";
import { toggleTableStatus } from "../../../store/slices/dashboard/tableSlice";

/**
 * @param {Object} props
 * @param {Object} props.table - Oggetto che rappresenta il tavolo
 * @param {number|null} props.expanded - ID del tavolo attualmente espanso (o null)
 * @param {(id: number) => void} props.toggleExpand - Funzione per espandere o comprimere un tavolo
 */
const TableItem = ({ table, expanded, toggleExpand }) => {
  const dispatch = useDispatch();

  return (
    <div key={table.id}>
      {/* Riga principale */}
      <div
        className={`grid grid-cols-5 align-item items-center mt-2 py-2 max-w-[972px] w-full cursor-pointer ${table.status === "Pagato" ? "bg-[#EBF9EE]" : "bg-[#F9F9F9]"}`}
        onClick={() => toggleExpand(table.id)}
      >
        <div className="justify-self-center">{table.id}</div>
        <div className="justify-self-center">{table.time}</div>
        <div className="justify-self-center">{table.total}</div>
        <div className="justify-self-center">{table.tip}</div>

        {/* Switch stato */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleTableStatus(table.id));
          }}
          className={`w-[90px] h-[36px] flex items-center justify-self-center px-2 rounded-full cursor-pointer text-white font-bold text-sm transition-colors ${
            table.status === "Pagato" ? "bg-[#34C759]" : "bg-[#FF9500]"
          }`}
        >
          {table.status === "Aperto" && <div className="w-4 h-4 rounded-full bg-white transition-all"></div>}
          <span className="flex-1 text-center">{table.status}</span>
          {table.status === "Pagato" && <div className="w-4 h-4 rounded-full bg-white transition-all"></div>}
        </div>
      </div>

      {/* Dettaglio ordine */}
      {/* expanded === table.id
       Controlla se il tavolo attuale (table.id) è quello attualmente espanso (cioè selezionato per mostrare i dettagli).
       table.items.length > 0
       Controlla se il tavolo ha almeno un elemento ordinato (items non è vuoto).*/}
      {expanded === table.id && table.items.length > 0 && (
        <div className="max-w-[972px] w-full px-12 py-6.25 text-sm text-gray-700 bg-[#FFFFFF]">
          <ul className="mb-2">
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
            <span>{table.totalFull}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableItem;