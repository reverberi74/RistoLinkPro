import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchBestSellers } from "../../store/slices/bestSellersSlice";

export default function BestSellersList() {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.bestSellers);

    useEffect(() => {
        dispatch(fetchBestSellers());
    }, [dispatch]);

    const last7DaysItems = items.filter(dish => {
        const date = new Date(dish.orderDate);
        const now = new Date();
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
        return date >= sevenDaysAgo;
    });

    if (status === 'loading') return <p>Caricamento...</p>;
    if (status === 'failed') return <p>Errore: {error}</p>;
    if (items.length === 0) return <p>Nessun dato disponibile</p>;

    return (
        <div className="space-y-4">
            {items.map((dish, index) => (
                <div
                    key={dish.id}
                    className="flex justify-between border-b border-[#EBEBEB] pb-4"
                >
                    {/* Colonna: posizione */}
                    <div className="w-12 flex items-center text-base font-extrabold text-muted shrink-0">
                        N. {index + 1}
                    </div>

                    {/* Colonna: nome + ordini */}
                    <div className="flex-1 px-1">
                        <div className="text-base text-text">{dish.name}</div>
                        <div className="text-xs text-primary mt-1">
                            Ordini {dish.orders}
                        </div>
                    </div>

                    {/* Colonna: prezzo */}
                    <div className="text-right text-xs font-extrabold text-text shrink-0 w-16">
                        {dish.price.toFixed(2).replace(".", ",")} €
                    </div>
                </div>
            ))}
        </div>
    );
}