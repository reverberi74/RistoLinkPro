import React, { useEffect, useRef, useState } from "react";
import CustomImage from "../shared/CustomImage";
import FiltersPopUp from "../shared/FiltersPopUp";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetCurrentsLabel } from "../../store/slices/labelSlice";
import CustomImagePreview from "../shared/dashboard/CustomImagePreview";

const ProductModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData = {},
    modalType = "create",
    categories = [],
}) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null); // immagine da inviare
    const [imagePreview, setImagePreview] = useState(null); // immagine da mostrare
    const [filterResetKey, setFilterResetKey] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const location = useLocation();
    const dispatch = useDispatch();



    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!isOpen) {
            setErrorMessage("");
            return;
        }

        const isMenuPage = location.pathname === "/dashboard/menu";

        if (modalType === "edit" && initialData) {
            setName(initialData.name || "");
            setPrice(initialData.price || "");
            setCategory(
                typeof initialData.category === "object" ? initialData.category._id : initialData.category
            );
            setDescription(initialData.description || "");
            setImage(initialData.image || "");

            const SERVER_URL = "http://localhost:3000"; // oppure import.meta.env.VITE_SERVER_URL

            const resolvedImage =
                initialData.image?.startsWith("/assets")
                    ? `${SERVER_URL}${initialData.image}`
                    : initialData.image || null;

            setImagePreview(resolvedImage);
        }

        if (modalType === "create") {
            setName("");
            setPrice("");
            setCategory("");
            setDescription("");
            setImage(null);  
            setImagePreview(null);  
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }

            if (isMenuPage) {
                dispatch(resetCurrentsLabel());
            }
        }

        setFilterResetKey(prev => prev + 1);

    }, [isOpen, initialData, modalType, location.pathname]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fakeUrl = URL.createObjectURL(file);
            setImage(file); // serve per inviare nel FormData
            setImagePreview(fakeUrl); // serve solo per mostrare l'immagine
        }
    };

    const handleImageChangeClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = () => {
        if (!name || !price || !category || !description || !image) {
            setErrorMessage("Compila tutti i campi obbligatori prima di continuare.");
            return;
        }

        setErrorMessage("");

        onSubmit({
            name,
            price,
            category,
            description,
            image,
        });
        onClose();
        setImage(null);
        setImagePreview(null);
    };

    if (!isOpen) return null;

    const selectedCategory = categories.find((cat) => cat._id === category);
    const categoryImage = selectedCategory?.image || null;

    return (
        <div className="absolute top-0 left-0 w-screen h-full bg-[#00000091] flex justify-center items-center z-50">
            <div className="bg-white rounded-3xl p-10 w-full max-w-[1000px] mx-auto relative">
                {/* X per chiusura */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-600 hover:text-black"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-xl font-semibold mb-6">
                    {modalType === "create" ? "Aggiungi nuovo piatto" : "Modifica piatto"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,_1fr)_auto_auto] gap-8 items-start">

                    {/* Colonna sinistra */}
                    <div className="space-y-5 flex-1">
                        <input
                            type="text"
                            placeholder="Nome del piatto"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="px-4 py-3 text-text placeholder:text-muted text-sm w-full shadow-elevation-1 p-2 rounded-md"
                        />
                        <div className="relative">
                            <span className="absolute inset-y-0 right-9 flex items-center pl-3 text-muted pointer-events-none">
                                €
                            </span>
                            <input
                                required
                                type="number"
                                step="0.01"
                                placeholder="Prezzo"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="px-4 py-3 text-text placeholder:text-muted text-sm w-full shadow-elevation-1 p-2 rounded-md"
                            />
                        </div>
                        <select
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="px-4 py-3 text-text text-sm w-full shadow-elevation-1 p-2 rounded-md"
                        >
                            <option value="">Categoria</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <textarea
                            required
                            placeholder="Descrizione (max 500 caratteri)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="px-4 py-3 text-text placeholder:text-muted text-sm w-full shadow-elevation-1 p-2 rounded-md h-57 resize-none"
                        />
                    </div>

                    {/* Colonna centrale */}
                    <div className="flex flex-col items-start gap-6 flex-1 self-start">
                        {/* Immagine categoria */}
                        <div className="max-w-[198px] w-full">
                            {categoryImage ? (
                                <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-elevation-1 group">
                                    <CustomImage
                                        src={selectedCategory?.image}
                                        alt={`Categoria ${category}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-21 left-16 rounded-xl p-1.5 bg-[#00000091] text-white flex items-center justify-center text-sm font-semibold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                        title="Modifica (non disponibile)"
                                    >
                                        Modifica
                                    </button>
                                </div>
                            ) : (
                                <div className="min-w-[198px] w-full aspect-square rounded-xl bg-gray-100 text-muted text-xs flex items-center justify-center text-center px-2 shadow-elevation-1">
                                    Immagine della categoria
                                </div>
                            )}
                        </div>
                        {/* Immagine piatto */}
                        <div className="max-w-[198px] w-full">
                            {imagePreview && imagePreview.trim() !== "" ? (
                                <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-elevation-1 group">
                                    <CustomImagePreview
                                        src={imagePreview}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={handleImageChangeClick}
                                        className="absolute top-21 left-16 rounded-xl p-1.5 bg-[#00000091] text-white flex items-center justify-center text-sm font-semibold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    >
                                        Modifica
                                    </button>
                                </div>
                            ) : (
                                <label
                                    onClick={handleImageChangeClick}
                                    className="min-w-[198px] w-full aspect-square rounded-xl bg-gray-300 hover:bg-gray-400 cursor-pointer text-text text-base flex flex-col items-center justify-center text-center gap-2 px-4 shadow-elevation-1 transition-colors duration-200 ease-in-out"
                                >
                                    <svg className="fill-text" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 21 21">
                                        <path d="M9.72 14.01v-2.73H6.98a.78.78 0 110-1.56h2.74V6.98a.78.78 0 111.56 0v2.74h2.73a.78.78 0 110 1.56h-2.73v2.73a.78.78 0 11-1.56 0Zm7.85-10.58A9.996 9.996 0 0010.5.5C4.98.5.5 4.98.5 10.5S4.98 20.5 10.5 20.5 20.5 16.02 20.5 10.5c0-2.12-.66-4.09-1.93-5.67a.78.78 0 10-1.19 1 8.44 8.44 0 011.6 4.67c0 4.66-3.78 8.44-8.44 8.44S2.06 15.16 2.06 10.5 5.84 2.06 10.5 2.06c2.26 0 4.37.84 6.01 2.37a.78.78 0 001.06-1.11Z" fill="currentColor" />
                                    </svg>
                                    Aggiungi una immagine del piatto
                                </label>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                    </div>
                    {/* Colonna destra */}
                    <div className="flex flex-col items-start justify-start gap-6 flex-1">
                        <FiltersPopUp key={filterResetKey} />
                    </div>
                </div>

                {/* Pulsante submit */}
                <div className="mt-8 text-center flex flex-col justify-center">
                    {errorMessage && (
                        <div className="text-red-600 text-sm text-center mt-4">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        className="flex mt-4 justify-center self-center items-center bg-primary text-white font-semibold transition-all w-[273px] h-[39px] rounded-full py-2 px-6 shadow-elevation-1 cursor-pointer text-sm"
                    >
                        {modalType === "create" ? "Aggiungi" : "Salva"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;