import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import {
  setCurrentProduct,
  setProducts,
} from "../../store/slices/productSlice";
import ProductItem from "../../components/shared/ProductItem";
import FiltersPopUp from "../../components/shared/FiltersPopUp";
import CategoryTitle from "../../components/shared/CategoryTitle";

const Products = () => {
  const { get } = useApi();
  const params = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [filtersSelection, setFilterSelection] = useState(false);

  const { all: products } = useSelector((state) => state.products);

  const fetchProducts = async () => {
    const products = await get(`/products/${params.category_id}`);
    dispatch(setProducts(products));
    setLoading(false);
  };

  const selectCurrentProduct = (product) => {
    dispatch(setCurrentProduct(product));
  };

  useEffect(() => {
    if (products.length > 0 && products[0].category._id == params.category_id) {
      setLoading(false);
      return;
    }

    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <CategoryTitle onOpenFilter={() => setFilterSelection(true)} />
        {filtersSelection && (
          <div className="absolute flex justify-center items-center top-0 left-0 h-full w-screen bg-[#00000061]">
            <FiltersPopUp onClick={() => setFilterSelection(false)} />
          </div>
        )}
        <div
          className="flex flex-col gap-2 rounded-4xl p-2 bg-white w-[375px] px-6 py-7"
          style={{
            boxShadow: "0 -3px 12px -5px rgba(0, 0, 0, 0.18)",
          }}
        >
          {!loading &&
            products.map((product) => (
              <ProductItem
                key={product._id}
                onSelectProduct={() => selectCurrentProduct(product)}
                product={product}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Products;
