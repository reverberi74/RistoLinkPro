import { useState, useRef, useEffect } from "react";
import CustomImageBusiness from "../shared/dashboard/CustomImageBusiness";

const BusinessProductItem = ({ onSelectProduct, product, onEdit, onDuplicate, onDelete }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Chiude il menu se clicco fuori
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div
            className="flex flex-row items-center mb-5 gap-8 rounded-3xl bg-white w-full shadow-elevation-1 border border-gray-100 px-4 py-4"
            onClick={onSelectProduct}
        >
            {/* Immagine */}
            <CustomImageBusiness
                src={product.image}
                alt={product.name}
                className="w-[80px] h-[80px] rounded-2xl object-cover"
            />

            {/* Nome */}
            <div className="w-3/10">
                <h3 className="font-semibold text-text text-base">{product.name}</h3>
            </div>

            {/* Categoria */}
            <div className="w-2/10">
                <p className="text-sm text-gray-500">
                    {typeof product.category === "object" ? product.category.name : "—"}
                </p>
            </div>

            {/* Descrizione */}
            <div className="w-3/10 text-sm text-gray-500 truncate">
                {product.description}
            </div>

            {/* Prezzo */}
            <div className="w-1/10 text-base font-bold text-text min-w-[60px] text-right">
                {product.price} €
            </div>

            {/* Icona 3 puntini */}
            <div className="w-1/10 relative" ref={menuRef}>
                <button
                    className="ml-2 text-primary hover:text-secondary"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </button>

                {menuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-23 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                        <button
                            onClick={() => { onEdit(product); setMenuOpen(false); }}
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                            Modifica
                        </button>
                        <button
                            onClick={() => { onDuplicate(product); setMenuOpen(false); }}
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                        >
                            Duplica
                        </button>
                        <button
                            onClick={() => { onDelete(product); setMenuOpen(false); }}
                            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                        >
                            Elimina
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusinessProductItem;