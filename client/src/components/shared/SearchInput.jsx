import React, { useState } from 'react'
import Toast from '../../components/shared/Toast'
import { useApi } from '../../hooks/useApi'
import { config } from '../../config';
import { useDispatch } from 'react-redux';
import { setSearchResult } from '../../store/slices/searchSlice';
import { useToast } from '../../hooks/useToast';

/**
 * Componente di input per effettuare ricerche tra i piatti del ristoratore.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.value - Valore attuale dell'input di ricerca.
 * @param {function} props.onChange - Funzione chiamata al cambiamento del valore input.
 * @param {Array} [props.categories] - (Facoltativo) Lista delle categorie.
 * @param {string} [props.businessId=config.BUSINESS_ID] - ID del ristoratore (fallback su valore da config).
 * 
 * @returns {JSX.Element} Campo di ricerca con pulsante di submit.
 */

const SearchInput = ({ value, onChange, categories, businessId = config.BUSINESS_ID, onSearchStart, onSearchFinish }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { get } = useApi();

  /**
  * Esegue la ricerca chiamando l'API e aggiornando lo stato Redux.
  * Se non viene trovato nulla, mostra un toast d'errore.
  */

  /**
  * Esegue la chiamata API e aggiorna Redux.
  */
  const handleSearch = async () => {
    const query = value.trim().toLowerCase();
    if (!query) return;

    if (onSearchStart) onSearchStart(); //indica inizio caricamento

    try {
      const payload = await get(`/search?u=${businessId}&q=${query}`);
      const _payload = { products: [], categories: [], ...payload };
      dispatch(setSearchResult(_payload));
    } catch (error) {
      console.error(error);
      toast.error("Nessun prodotto corrisponde alla ricerca.");
    } finally {
      if (onSearchFinish) onSearchFinish(); //indica fine caricamento
    }
  };

  const isActive = value.trim().length > 0

  return (
    <div className="relative w-full">
      <input
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleSearch()
          }
        }}
        placeholder="Cerca tra i piatti disponibili"
        className="w-full bg-white pl-4 pr-11 py-3 rounded-full border border-gray-300 text-xs placeholder:text-muted text-text"
      />

      <button
        onClick={handleSearch}
        disabled={!isActive}
        className={`absolute right-4 top-1/2 -translate-y-1/2 text-muted transition-opacity ${isActive ? 'text-primary opacity-100 cursor-pointer' : 'text-muted opacity-50 cursor-default'
          }`}
      >
        <i className="fas fa-search"></i>
      </button>
    </div>
  )
}

export default SearchInput