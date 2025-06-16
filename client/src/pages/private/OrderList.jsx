import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const orders = [
    {
        id: 1,
        totalAmount: "35,80 €",
        date: "27 Apr 2025",
        status: "Paga in app",
        statusColor: "text-sky-500",
        takeaway: false,
    },
    {
        id: 2,
        amount: "57,00 €",
        date: "27 Apr 2025",
        status: null,
        takeaway: false,
    },
    {
        id: 3,
        amount: "130,00 €",
        date: "01 Mar 2025",
        status: null,
        takeaway: false,
    },
    {
        id: 4,
        amount: "20,00 €",
        date: "15 Gen 2025",
        status: null,
        takeaway: true,
    },
];

export default function OrderList() {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const [subtotal, setSubtotal] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const sum = (cart.items || []).reduce((acc, item) => acc + item.price * item.quantity, 0);
        setSubtotal(sum);
    }, [cart]);

    useEffect(() => {
        const tax = subtotal * 0.1;
        const service = 2
        setTotalAmount(subtotal + tax + service);
    }, [subtotal]);

    return (
        <div className="relative w-[375px] mx-auto h-full">
            {/* Header */}
            <div className="flex flex-col items-center justify-center bg-white mx-auto max-w-[23.4375rem] w-full font-sans">
                <div className="flex pt-4 pl-4 pb-5 pr-3 items-center bg-white w-[23.4375rem] gap-5">
                    <img
                        className="cursor-pointer"
                        src="/images/Component1.svg"
                        alt="arrow"
                        onClick={() =>
                            navigate(location.key === "default" ? "/private" : -1)
                        }
                    />
                    <h1 className="w-full font-semibold text-md">I miei ordini</h1>
                </div>
            </div>

            {/* Contenitore unico per tutti gli ordini */}
            <div
                className="flex flex-col gap-2 rounded-4xl p-2 bg-white w-[375px] px-6 py-7 mt-4"
                style={{
                    boxShadow: "0 -3px 12px -5px rgba(0, 0, 0, 0.18)",
                }}
            >
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="flex items-center py-4 border-b border-gray-100 last:border-b-0"
                    >
                        {/* Icona */}
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                            {/* Icona ricevuta */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59" fill="none">
                                <rect width="58.791" height="58.791" rx="20" fill="#F3F3F3" />
                                <path d="M43.5883 42.9473H42.5612V13.8769C42.5612 13.0559 41.8933 12.388 41.0723 12.388H16.1071C15.2861 12.388 14.6182 13.0559 14.6182 13.8769V46.8465C14.6182 48.7815 16.1664 50.3885 18.0694 50.4288C18.0953 50.4293 18.121 50.4296 18.1468 50.4296H18.1493H41.4597C43.4544 50.4296 45.0773 48.8068 45.0773 46.812V44.4362C45.0773 43.6153 44.4094 42.9473 43.5883 42.9473ZM20.1847 44.4363V46.9015C20.1847 47.4458 19.9725 47.9581 19.588 48.3432C19.1905 48.7401 18.662 48.9532 18.101 48.9402C17.0016 48.9169 16.1071 47.9777 16.1071 46.8465V13.8769H41.0723V42.9473H21.6736C20.8526 42.9473 20.1847 43.6153 20.1847 44.4363ZM43.5883 46.812C43.5883 47.9857 42.6334 48.9407 41.4596 48.9407H21.0256C21.4466 48.3483 21.6736 47.6422 21.6736 46.9015V44.4363H43.5884V46.812H43.5883Z" fill="#332B2C" />
                                <path d="M21.5537 27.278C21.5537 27.6891 21.8871 28.0225 22.2982 28.0225C22.7094 28.0225 23.0427 27.6892 23.0427 27.278V26.7753C24.245 26.463 25.0156 25.4332 25.1863 24.4173C25.4072 23.1037 24.694 21.9165 23.4116 21.4633C22.6714 21.2015 21.8521 20.885 21.3886 20.5215C21.2233 20.3918 21.153 20.1145 21.2094 19.815C21.2655 19.5172 21.4666 19.1566 21.8625 19.0373C22.8167 18.75 23.6645 19.4076 23.6888 19.4268C24.0055 19.6855 24.4721 19.6403 24.7332 19.3248C24.9953 19.0081 24.951 18.5388 24.6343 18.2766C24.5953 18.2443 23.9669 17.7348 23.0428 17.5452V17.143C23.0428 16.7319 22.7095 16.3985 22.2983 16.3985C21.8871 16.3985 21.5538 16.7318 21.5538 17.143V17.5787C21.5137 17.5891 21.4735 17.5995 21.433 17.6117C20.5676 17.8725 19.9212 18.6111 19.7462 19.5393C19.5856 20.3918 19.8628 21.217 20.4697 21.693C20.9799 22.0932 21.6885 22.4334 22.9154 22.8671C23.7859 23.1747 23.7667 23.8811 23.7181 24.1705C23.6206 24.7501 23.1331 25.3765 22.293 25.382C21.491 25.3875 21.2409 25.3476 20.6218 24.9427C20.2776 24.7174 19.8163 24.814 19.5913 25.1582C19.3662 25.5022 19.4626 25.9636 19.8067 26.1886C20.4684 26.6214 20.9507 26.7891 21.5538 26.8457V27.278H21.5537Z" fill="#332B2C" />
                                <path d="M31.6815 22.3778H38.1604C38.5716 22.3778 38.9049 22.0445 38.9049 21.6333C38.9049 21.2221 38.5716 20.8888 38.1604 20.8888H31.6815C31.2703 20.8888 30.937 21.2221 30.937 21.6333C30.937 22.0445 31.2703 22.3778 31.6815 22.3778Z" fill="#332B2C" />
                                <path d="M28.7152 25.3556H38.1604C38.5715 25.3556 38.9048 25.0223 38.9048 24.6111C38.9048 24.2 38.5715 23.8666 38.1604 23.8666H28.7152C28.304 23.8666 27.9707 24.1999 27.9707 24.6111C27.9707 25.0223 28.304 25.3556 28.7152 25.3556Z" fill="#332B2C" />
                                <path d="M36.3296 30.6463H22.0448C21.6336 30.6463 21.3003 30.9796 21.3003 31.3908C21.3003 31.8019 21.6336 32.1353 22.0448 32.1353H36.3296C36.7408 32.1353 37.0741 31.802 37.0741 31.3908C37.074 30.9796 36.7407 30.6463 36.3296 30.6463Z" fill="#332B2C" />
                                <path d="M36.3296 34.3686H22.0448C21.6336 34.3686 21.3003 34.7019 21.3003 35.1131C21.3003 35.5243 21.6336 35.8576 22.0448 35.8576H36.3296C36.7408 35.8576 37.0741 35.5243 37.0741 35.1131C37.0741 34.7019 36.7407 34.3686 36.3296 34.3686Z" fill="#332B2C" />
                                <path d="M32.9369 39.5798C33.3481 39.5798 33.6814 39.2465 33.6814 38.8353C33.6814 38.4241 33.3481 38.0908 32.9369 38.0908H22.0448C21.6336 38.0908 21.3003 38.4241 21.3003 38.8353C21.3003 39.2465 21.6336 39.5798 22.0448 39.5798H32.9369Z" fill="#332B2C" />
                                <path d="M36.3294 39.5798C36.7406 39.5798 37.0739 39.2465 37.0739 38.8353C37.0739 38.4242 36.7406 38.0908 36.3294 38.0908C35.9183 38.0908 35.585 38.4242 35.585 38.8353C35.585 39.2465 35.9183 39.5798 36.3294 39.5798Z" fill="#332B2C" />
                            </svg>
                        </div>

                        {/* Dettagli ordine */}
                        <div className="flex-1">
                            <div className="font-semibold text-base">
                                Importo totale{" "}
                                {order.id === 1
                                    ? `${totalAmount.toFixed(2)} €`
                                    : order.amount}
                            </div>
                            {order.status ? (
                                <button
                                    className={`${order.statusColor} text-sm font-semibold mt-1 py-1 cursor-pointer border-none rounded-md`}
                                    onClick={() => navigate("/private/payments")}
                                >
                                    {order.status}
                                </button>
                            ) : (
                                <div className="text-gray-400 text-sm mt-1">
                                    {order.date}
                                    {order.takeaway && " – Take away"}
                                </div>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
