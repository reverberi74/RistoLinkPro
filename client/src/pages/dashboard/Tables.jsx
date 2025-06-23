import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableItem from "../../components/shared/dashboard/TableItem";
import { fetchTablesFromOrders } from "../../store/slices/dashboard/tableSlice";

const Tables = () => {
  const [selectedTab, setSelectedTab] = useState("Tutti");
  const [expanded, setExpanded] = useState(null);
  const dispatch = useDispatch();

  const { tables, loading, error } = useSelector((state) => state.tables);

  useEffect(() => {
    dispatch(fetchTablesFromOrders());
  }, [dispatch]);

  const filteredData =
    selectedTab === "Aperti"
      ? tables.filter((t) => t.status === "Aperto")
      : tables;

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-white max-w-[972px] w-full mx-auto px-4">
      {/* Bottoni filtro */}
      <div className="mb-4 flex justify-start">
        <button
          className={`py-2 px-8 cursor-pointer rounded-full mr-2 text-[14px] ${selectedTab === "Tutti"
              ? "bg-[#070FA3] text-white"
              : "bg-[#070FA326] text-gray-700"
            }`}
          onClick={() => setSelectedTab("Tutti")}
        >
          Tutti
        </button>
        <button
          className={`py-2 px-8 cursor-pointer rounded-full mr-2 text-[14px] mr-2.5 ${selectedTab === "Aperti"
              ? "bg-[#070FA3] text-white"
              : "bg-[#070FA326] text-gray-700"
            }`}
          onClick={() => setSelectedTab("Aperti")}
        >
          Aperti
        </button>
      </div>

      {/* Intestazione tabella */}
      <div className="grid grid-cols-5 font-semibold text-gray-700 max-w-[972px] w-full rounded-tl-2xl rounded-tr-2xl px-4 py-3 bg-[#EBEBEB]">
        <div className="justify-self-center">Tavolo</div>
        <div className="justify-self-center">Orario</div>
        <div className="justify-self-center">Totale</div>
        <div className="justify-self-center">Mance</div>
        <div className="justify-self-center">Stato</div>
      </div>

      {/* Stato del caricamento */}
      {loading && (
        <div className="text-center py-6 text-gray-500">Caricamento tavoli...</div>
      )}
      {error && (
        <div className="text-center py-6 text-red-500">
          Errore: {error}
        </div>
      )}

      {/* Righe tavoli */}
      {filteredData.map((table) => (
        <TableItem
          key={table.orderId || table.id}
          table={table}
          expanded={expanded}
          toggleExpand={toggleExpand}
        />
      ))}
    </div>
  );
};

export default Tables;
