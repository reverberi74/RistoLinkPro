/**
 * Componente `MenuBusiness` lato dashboard business (ristoratore).
 * 
 * Questo componente permette di:
 * - Visualizzare tutti i prodotti del menù, filtrati per categoria o ordinati per nome/prezzo.
 * - Cercare un piatto tramite barra di ricerca.
 * - Aggiungere, modificare, duplicare o eliminare un piatto tramite modale.
 * - Selezionare "Tutte le categorie" per mostrare ogni prodotto.
 * - Integrare il filtro di categoria, la ricerca testuale e l’ordinamento via Redux.
 *
 * Hook principali:
 * - `useEffect`: per il caricamento di categorie/prodotti iniziale e aggiornamenti dinamici.
 * - `useSelector`: per leggere dati da Redux (categorie, prodotti, user, ricerca).
 * - `useDispatch`: per inviare azioni di ordinamento, filtro e set di prodotti.
 *
 * Hook custom:
 * - `useApi`: per effettuare chiamate HTTP con `get`, `post`, `put`, `del`.
 *
 * Stato locale:
 * - `query`: stringa di ricerca.
 * - `loading`: stato di caricamento.
 * - `categories`: array di categorie disponibili.
 * - `isModalOpen`, `modalType`, `selectedProduct`: gestiscono la modale prodotto.
 *
 * Funzionalità aggiuntive:
 * - Duplicazione prodotto (con suffisso “(Copia)”).
 * - Selezione dinamica della categoria con valore speciale "all" per mostrare tutto.
 */
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import BusinessProductItem from "../../components/dashboard/BusinessProductItem";
import ProductModal from "../../components/dashboard/ProductModal";

import SearchInput from "../../components/shared/SearchInput";
import { clearSearchResult } from "../../store/slices/searchSlice";
import { setSortBy, selectSortBy } from "../../store/slices/sortSlice";
import { setCategory } from "../../store/slices/categoryFilterSlice";
import { setCurrentProduct, setProducts, sortBusinessMenuProducts } from "../../store/slices/productSlice";

import { useApi } from "../../hooks/useApi";

function MenuBusiness() {
    // 1. Redux e stato
    const dispatch = useDispatch();
    const sortBy = useSelector(selectSortBy);
    const category = useSelector((state) => state.filters.category);
    const { products: filteredProducts } = useSelector((state) => state.search);
    const { all: products } = useSelector((state) => state.products);
    const user = useSelector((state) => state.auth.user);

    const [query, setQuery] = useState("");

    const isSearchCompleted = query.trim() !== "" && filteredProducts.length === 0;
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("create");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);

    const { get, post, put, del } = useApi();

    /**
     * Aggiorna il criterio di ordinamento selezionato per la lista di prodotti.
     * @param {React.ChangeEvent<HTMLSelectElement>} e - Evento di cambio selezione.
     */
    const handleChange = (e) => {
        dispatch(sortBusinessMenuProducts(e.target.value));
    };


    /**
 * Imposta la categoria selezionata e carica i relativi prodotti.
 * @param {React.ChangeEvent<HTMLSelectElement>} e - Evento di cambio selezione.
 */
    const handleChangeCategoryFilter = (e) => {
        const selected = e.target.value;
        dispatch(setCategory(selected));
        setIsCategoryLoading(true);
        fetchProducts(selected || null);
    };

    /**
 * Apre la modale per la creazione di un nuovo prodotto.
 */
    const openCreateModal = () => {
        setModalType("create");
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    /**
 * Apre la modale di modifica per un prodotto esistente.
 * @param {Object} product - Prodotto da modificare.
 */
    const openEditModal = (product) => {
        setModalType("edit");
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    /**
 * Elimina un prodotto dopo conferma e ricarica i prodotti della categoria.
 * @param {Object} product - Prodotto da eliminare.
 */
    const handleDeleteProduct = async (product) => {
        if (!window.confirm(`Sei sicuro di voler eliminare "${product.name}"?`)) return;

        try {
            await del(`/products/${product._id}`);
            const catId = typeof product.category === "object" ? product.category._id : product.category;
            fetchProducts(catId);
        } catch (error) {
            console.error("Errore durante l'eliminazione del prodotto:", error);
        }
    };

    /**
 * Duplica un prodotto esistente e lo aggiunge alla lista.
 * @param {Object} product - Prodotto da duplicare.
 */
    const handleDuplicateProduct = async (product) => {
        const categoryId = typeof product.category === "object" ? product.category._id : product.category;

        const formData = new FormData();
        formData.append("name", `${product.name} (Copia)`);
        formData.append("price", product.price);
        formData.append("category", categoryId);
        formData.append("description", product.description);
        const relativeImagePath = product.image?.includes("/assets/")
            ? product.image.slice(product.image.indexOf("/assets"))
            : "";

        formData.append("image", relativeImagePath);
        try {
            await post("/products", formData);
            fetchProducts(category || null);
        } catch (error) {
            console.error("Errore duplicazione:", error);
        }
    };


    /**
 * Gestisce il submit della modale per creare o modificare un prodotto.
 * @param {Object} productData - Dati del prodotto da salvare.
 */
    const handleModalSubmit = async (productData) => {
        try {
            const formData = new FormData();

            formData.append("name", productData.name);

            // Se è un'immagine "Blob" (creata con URL.createObjectURL), non è valida per l'upload
            if (productData.image instanceof File) {
                formData.append("image", productData.image);
            }

            formData.append("price", productData.price);
            formData.append("category", productData.category);
            formData.append("description", productData.description);

            if (modalType === "create") {
                await post("/products", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                fetchProducts(productData.category);
                fetchProducts(category || null);
            } else if (modalType === "edit" && selectedProduct?._id) {
                await put(`/products/${selectedProduct._id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                const cat = categories.find(c => c._id === productData.category);
                if (cat?._id) fetchProducts(cat._id);
            }
        } catch (error) {
            console.error("Errore salvataggio prodotto:", error);
        } finally {
            setIsModalOpen(false);
        }
    };

    /**
     * Recupera i prodotti dal backend in base alla categoria.
     * @param {string|null} categoryId - ID della categoria oppure null per tutti i prodotti.
     */
    const fetchProducts = useCallback(async (categoryId = null) => {
        try {
            let url = "/products";
            if (categoryId && categoryId !== "all") {
                url = `/products/${categoryId}`;
            }
            const fetchedProducts = await get(url);
            dispatch(setProducts(fetchedProducts));
        } catch (error) {
            console.error("Errore nel caricamento dei prodotti:", error);
        } finally {
            setLoading(false);
            setIsCategoryLoading(false); // qui
        }
    }, [get, dispatch]);

    /**
     * Recupera le categorie del ristoratore dal backend e carica i prodotti.
     */
    const fetchCategories = async () => {
        try {
            if (!user?._id) return;

            // Recupera tutte le categorie associate all'utente
            const categories = await get(`/categories/${user._id}`);
            setCategories(categories);

            // Imposta il filtro categoria su "all" per indicare "Tutte le categorie"
            dispatch(setCategory("all"));

            // Carica tutti i prodotti (nessun filtro per categoria)
            fetchProducts(null);
        } catch (error) {
            console.error("Errore nel caricamento delle categorie:", error);
        }
    };

    // 6. Effect su mount
    useEffect(() => {
        fetchCategories();
    }, []);

    // 7. Effect ricerca
    useEffect(() => {
        if (query.trim() === "") {
            dispatch(clearSearchResult());
            setSearchStarted(false);
        }
    }, [query]);

    // Ricarica tutti i prodotti se selezionata "Tutte le categorie"
    useEffect(() => {
        if (category === "all") {
            fetchProducts(null);
        } else if (category) {
            fetchProducts(category);
        }
    }, [category, fetchProducts]);

    // Stati per gestire l'avvio della ricerca e il caricamento
    const [searchStarted, setSearchStarted] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);

    // Verifica se non ci sono risultati dalla ricerca
    const noSearchResults = searchStarted && !searchLoading && filteredProducts.length === 0;
    const isSearching = searchStarted && filteredProducts.length > 0;

    // Render
    return (
        <div className="max-w-[972px] w-full px-4 mb-20">
            <div className="flex flex-row w-full justify-between items-center gap-4 mt-12">
                <button
                    type="button"
                    onClick={openCreateModal}
                    className="flex items-center gap-3 bg-white text-primary hover:bg-primary hover:text-white font-semibold transition-all w-auto h-[39px] rounded-full py-2 px-6 shadow-elevation-1 cursor-pointer text-sm"
                >
                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
                        <path d="M9.72 14.01v-2.73H6.98a.78.78 0 110-1.56h2.74V6.98a.78.78 0 111.56 0v2.74h2.73a.78.78 0 110 1.56h-2.73v2.73a.78.78 0 11-1.56 0Z
          m7.85-10.58A9.996 9.996 0 0010.5.5C4.98.5.5 4.98.5 10.5S4.98 20.5 10.5 20.5 20.5 16.02 20.5 10.5
          c0-2.12-.66-4.09-1.93-5.67a.78.78 0 10-1.19 1 8.44 8.44 0 011.6 4.67c0 4.66-3.78 8.44-8.44 8.44
          S2.06 15.16 2.06 10.5 5.84 2.06 10.5 2.06c2.26 0 4.37.84 6.01 2.37a.78.78 0 001.06-1.11Z"
                            fill="currentColor" />
                    </svg>
                    Aggiungi un nuovo piatto
                </button>

                <ProductModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleModalSubmit}
                    modalType={modalType}
                    initialData={selectedProduct}
                    categories={categories}
                />

                <div className="w-full sm:w-1/3">
                    <SearchInput
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onSearchStart={() => {
                            setSearchStarted(true);
                            setSearchLoading(true);
                        }}
                        onSearchFinish={() => setSearchLoading(false)}
                        businessId={user._id}
                    />
                </div>

                <div>
                    <select
                        value={category || "all"}
                        onChange={handleChangeCategoryFilter}
                        className="text-xs border border-gray-300 rounded-lg px-4 py-2"
                    >
                        <option value="all">Tutte le categorie</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <select
                        value={sortBy}
                        onChange={handleChange}
                        className="text-xs border border-gray-300 rounded-lg px-4 py-2"
                    >
                        <option value="NAME_ASC">Nome A-Z</option>
                        <option value="NAME_DESC">Nome Z-A</option>
                        <option value="PRICE_ASC">Prezzo crescente</option>
                        <option value="PRICE_DESC">Prezzo decrescente</option>
                    </select>
                </div>
            </div>

            <div className="mt-12">
                {noSearchResults ? (
                    <div className="text-center flex rounded-3xl bg-white w-full shadow-elevation-1 px-6 py-7 justify-center my-11 text-sm text-muted">
                        Nessun piatto corrisponde alla ricerca.
                    </div>
                ) : isSearching ? (
                    filteredProducts.map((product) => (
                        <BusinessProductItem
                            key={product._id}
                            product={product}
                            onEdit={(p) => openEditModal(p)}
                            onDuplicate={handleDuplicateProduct}
                            onDelete={handleDeleteProduct}
                        />
                    ))
                ) : !loading && !isCategoryLoading ? (
                    (() => {
                        const filteredByCategory =
                            category && category !== "all"
                                ? products.filter((p) => {
                                    const prodCatId = typeof p.category === "object" ? p.category._id : p.category;
                                    return String(prodCatId) === String(category);
                                })
                                : products;

                        return filteredByCategory.length > 0 ? (
                            filteredByCategory.map((product) => (
                                <BusinessProductItem
                                    key={product._id}
                                    product={product}
                                    onEdit={(p) => openEditModal(p)}
                                    onDuplicate={handleDuplicateProduct}
                                    onDelete={handleDeleteProduct}
                                />
                            ))
                        ) : (
                            <div className="text-center flex rounded-3xl bg-white w-full shadow-elevation-1 px-6 py-7 justify-center my-11 text-sm text-muted">
                                Nessun piatto disponibile.
                            </div>
                        );
                    })()
                ) : null}
            </div>
        </div>
    );
};

export default MenuBusiness;