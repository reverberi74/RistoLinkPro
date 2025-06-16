// Container - Mostra tutti i tavoli, gestisce espansione
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TableItem from "../../components/shared/dashboard/TableItem";

const Tables = () => {
  const [selectedTab, setSelectedTab] = useState("Tutti");
  const [expanded, setExpanded] = useState(null);

  const tables = useSelector((state) => state.tables.tables);

  const filteredData = selectedTab === "Aperti"
    ? tables.filter((t) => t.status === "Aperto")
    : tables;

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <div className="bg-white max-w-[972px] w-full mx-auto px-4">
      {/* Bottoni */}
      <div className="mb-4 flex justify-start">
        <button
          className={`py-2 px-8 cursor-pointer rounded-full mr-2 text-[14px]  ${selectedTab === "Tutti"
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

      {/* Righe */}
      {filteredData.map((table) => (
        <TableItem key={table.id} table={table} expanded={expanded} toggleExpand={toggleExpand} />
      ))}
    </div>
  );
};

export default Tables;
