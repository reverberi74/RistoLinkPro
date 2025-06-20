import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SearchInput from '../../components/shared/SearchInput'
import { clearSearchResult } from '../../store/slices/searchSlice'
import { setCurrentCategory } from '../../store/slices/categorySlice'
import CategoryItem from '../../components/shared/CategoryItem'
import { setCurrentProduct } from '../../store/slices/productSlice'
import ProductItem from '../../components/shared/ProductItem'
import { useSearchParams } from 'react-router-dom';

const Categories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
     const [searchParams] = useSearchParams();  
    const { all: categories } = useSelector((state) => state.categories);
    const { products: filteredProducts } = useSelector((state) => state.search);
    const [query, setQuery] = useState("")

    const isSearching = filteredProducts.length > 0;

    const handleNavigate = (categoryId) => {
        const activeCategory = categories.find((item) => item._id == categoryId);
        dispatch(setCurrentCategory(activeCategory));
        navigate(`/private/products/${categoryId}`);
    };

    const selectCurrentProduct = (product) => {
        dispatch(setCurrentProduct(product));
    }

    // Reset dei risultati quando la ricerca viene svuotata
    useEffect(() => {
        if (query.trim() === "") {
            dispatch(clearSearchResult())
        }
    }, [query])

    // Salva numero tavolo dal QR code
    useEffect(() => {
        const table = searchParams.get("table");
        if (table) {
            localStorage.setItem("tableNumber", table);
        }
    }, [searchParams]);

    return (
        <div className="flex justify-center bg-white mx-auto max-w-[23.4375rem] w-full font-sans">
            <div className="w-full max-w-md">
                {/* Campo ricerca */}
                <div className="p-4">
                    <SearchInput
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* Risultati ricerca o categorie */}
                <div className="flex flex-col item-center px-5 py-4 space-y-3">
                    {isSearching ? (
                        filteredProducts?.map((product) => (
                            <ProductItem key={product._id} onSelectProduct={() => selectCurrentProduct(product)} product={product} />
                        ))
                    ) : (
                        categories.map((category) => (
                            <CategoryItem
                                category={category}
                                key={category._id}
                                onClick={() => handleNavigate(category._id)} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Categories