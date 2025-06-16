import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchBestSellers } from "../../store/slices/bestSellersSlice";
import CustomImage from "../shared/CustomImage";

export default function BestSellersEver() {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.bestSellers);

    useEffect(() => {
        dispatch(fetchBestSellers());
    }, [dispatch]);

    if (status === 'loading') return <p>Caricamento...</p>;
    if (status === 'failed') return <p>Errore: {error}</p>;
    if (items.length === 0) return <p>Nessun dato disponibile</p>;

    return (
        <div className="flex flex-nowrap gap-4 overflow-x-auto sm:overflow-visible sm:grid sm:grid-cols-3 sm:gap-6 scrollbar-hide sm:scrollbar-auto">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className="flex items-center bg-white rounded-2xl shadow p-3 w-[300px] shrink-0 sm:shrink"
                >
                    <CustomImage
                        src={item.image}
                        alt={item.name}
                        className="w-[90px] h-[90px] object-cover rounded-xl"
                    />
                    <div className="flex flex-col">
                        <div className="relative flex-1 px-3 overflow-hidden">
                            {/* Numero */}
                            <div className="absolute bottom-0 right-0 text-[4rem] font-bold text-primary opacity-20 z-0 leading-none pointer-events-none">
                                {index + 1}
                            </div>

                            {/* Contenuto testuale */}
                            <h4 className="text-base font-semibold text-text leading-tight relative z-10">
                                {item.name}
                            </h4>
                            <p className="sm:mt-2 text-base sm:text-xs text-muted relative z-10">
                                Lorem ipsum dolor sit...
                            </p>
                            <div className="flex flex-row justify-between items-center relative z-10">
                                <p className="text-sm text-primary font-semibold">
                                    {item.price.toFixed(2).replace(".", ",")} €
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}