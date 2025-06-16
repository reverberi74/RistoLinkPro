//Redux slice -	Stato globale dei tavoli, azioni e reducer
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tables: [
    {
        id: 1,
        time: "12.33",
        total: "67,00 €",
        tip: "5,00 €",
        status: "Pagato",
        items: [
            { name: "Tartare di manzo in stile orientale (x 2)", price: "19,60 €" },
            { name: "Bruschetta con pomodori", price: "3,20 €" },
            { name: "Polentina con funghi porcini e lardo", price: "6,00 €" },
        ],
        subtotal: "28,80 €",
        service: "2,00 €",
        totalFull: "30,80 €",
    },
    {
        id: 5,
        time: "12.52",
        total: "150,00 €",
        tip: "-",
        status: "Aperto",
        items: [
            { name: "Tartare di manzo in stile orientale (x 2)", price: "19,60 €" },
            { name: "Bruschetta con pomodori", price: "3,20 €" },
            { name: "Polentina con funghi porcini e lardo", price: "6,00 €" },
        ],
        subtotal: "28,80 €",
        service: "2,00 €",
        totalFull: "30,80 €",
    },
    {
        id: 15,
        time: "13.13",
        total: "85,00 €",
        tip: "2,00 €",
        status: "Pagato",
        items: [
            { name: "Tartare di manzo in stile orientale (x 2)", price: "19,60 €" },
            { name: "Bruschetta con pomodori", price: "3,20 €" },
            { name: "Polentina con funghi porcini e lardo", price: "6,00 €" },
        ],
        subtotal: "28,80 €",
        service: "2,00 €",
        totalFull: "30,80 €",
    },
    {
        id: 7,
        time: "13.20",
        total: "0,00 €",
        tip: "-",
        status: "Pagato",
        items: [
            { name: "Tartare di manzo in stile orientale (x 2)", price: "19,60 €" },
            { name: "Bruschetta con pomodori", price: "3,20 €" },
            { name: "Polentina con funghi porcini e lardo", price: "6,00 €" },
        ],
        subtotal: "28,80 €",
        service: "2,00 €",
        totalFull: "30,80 €",
    },
    {
        id: 12,
        time: "13.25",
        total: "72,00 €",
        tip: "-",
        status: "Aperto",
        items: [
            { name: "Tartare di manzo in stile orientale (x 2)", price: "19,60 €" },
            { name: "Bruschetta con pomodori", price: "3,20 €" },
            { name: "Polentina con funghi porcini e lardo", price: "6,00 €" },
        ],
        subtotal: "28,80 €",
        service: "2,00 €",
        totalFull: "30,80 €",
    },
    {
        id: 9,
        time: "13.37",
        total: "0,00 €",
        tip: "-",
        status: "Pagato",
        items: [
            { name: "Tartare di manzo in stile orientale (x 2)", price: "19,60 €" },
            { name: "Bruschetta con pomodori", price: "3,20 €" },
            { name: "Polentina con funghi porcini e lardo", price: "6,00 €" },
        ],
        subtotal: "28,80 €",
        service: "2,00 €",
        totalFull: "30,80 €",
    },
  ],
};
/**
 *Reducer chiamato toggleTableStatus, che riceve:
  state: lo stato corrente dello slice ({ tables: [...] })
  action: l’azione Redux inviata, con un payload contenente l’id del tavolo da aggiornare.
  const id = action.payload (Estrae l’id del tavolo da modificare dall’oggetto action.payload)
  Cerca nell’array tables il tavolo corrispondente all’id ricevuto, usando Array.find()
  Controlla se ha trovato un tavolo con quell’id.
  Se lo trova, inverte lo stato del tavolo:
  Se è "Pagato" → diventa "Aperto"
  Altrimenti → diventa "Pagato"
 */ 
const tableSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    toggleTableStatus(state, action) {
      const id = action.payload;
      const table = state.tables.find((t) => t.id === id);
      if (table) {
        table.status = table.status === "Pagato" ? "Aperto" : "Pagato";
      }
    },
  },
});

export const { toggleTableStatus } = tableSlice.actions;
export default tableSlice.reducer;
