import React, { useState, useEffect } from "react";
import LineChartTurnover from "../../components/dashboard/LineChartTurnover";
import InfoBox from "../../components/shared/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../store/slices/categoryFilterSlice";
import BestSellersList from "../../components/dashboard/BestSellersList";
import { DoughnutChartAppPayments } from "../../components/dashboard/DoughnutChartAppPayments";
import { DoughnutChartPositiveRewievs } from "../../components/dashboard/DoughnutChartPositiveRewievs";
import VerticalBarChartNewCustomers from "../../components/dashboard/VerticalBarChartNewCustomers";
import BestSellersEver from "../../components/dashboard/BestSellersEver";

import { useApi } from "../../hooks/useApi";

function Dashboard() {
    const [filter, setFilter] = useState("anno");
    const [paymentFilter, setPaymentFilter] = useState("Tutti");
    const category = useSelector((state) => state.filters.category);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [categories, setCategories] = useState([]);
    const { get } = useApi();


    const svgIcon1 = (
        <svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 26 26" fill="none">
            <path d="M22.3912 20.8861H21.6892V1.01761C21.6892 0.456473 21.2327 0 20.6716 0H3.60884C3.04771 0 2.59119 0.456473 2.59119 1.01761V23.5511C2.59119 24.8736 3.64937 25.9719 4.94998 25.9994C4.9677 25.9998 4.98522 26 5.00289 26H5.00457H20.9364C22.2997 26 23.4089 24.8909 23.4089 23.5275V21.9037C23.4089 21.3426 22.9523 20.8861 22.3912 20.8861ZM6.39572 21.9038V23.5887C6.39572 23.9607 6.25069 24.3108 5.98789 24.574C5.71621 24.8453 5.35501 24.9909 4.97156 24.982C4.22015 24.9661 3.60884 24.3242 3.60884 23.5511V1.01761H20.6716V20.8861H7.41332C6.85219 20.8861 6.39572 21.3426 6.39572 21.9038ZM22.3912 23.5275C22.3912 24.3297 21.7386 24.9824 20.9363 24.9824H6.97046C7.25819 24.5775 7.41332 24.0949 7.41332 23.5887V21.9038H22.3913V23.5275H22.3912Z" fill="#332B2C" />
            <path d="M7.33157 10.1768C7.33157 10.4577 7.55938 10.6856 7.8404 10.6856C8.12143 10.6856 8.34923 10.4578 8.34923 10.1768V9.83319C9.17097 9.61975 9.69763 8.91587 9.81432 8.22159C9.96524 7.32378 9.47779 6.51235 8.60136 6.20263C8.09543 6.02373 7.53551 5.8074 7.21869 5.55893C7.1057 5.47032 7.05766 5.2808 7.09625 5.0761C7.13459 4.87257 7.27201 4.62608 7.54257 4.54457C8.19475 4.3482 8.77422 4.79762 8.79082 4.81077C9.00725 4.98754 9.32616 4.95666 9.50461 4.74105C9.68376 4.52457 9.6535 4.20383 9.43702 4.02463C9.41036 4.00259 8.98085 3.65433 8.34928 3.52473V3.24986C8.34928 2.96888 8.12148 2.74103 7.84045 2.74103C7.55943 2.74103 7.33163 2.96883 7.33163 3.24986V3.54764C7.3042 3.55475 7.27673 3.56186 7.24905 3.57023C6.65755 3.74843 6.21581 4.25324 6.09622 4.88765C5.98643 5.47032 6.17584 6.03429 6.59068 6.35965C6.93939 6.63316 7.42369 6.86563 8.26224 7.16204C8.8572 7.37233 8.84404 7.85511 8.81083 8.0529C8.74421 8.44904 8.41103 8.87713 7.8368 8.88094C7.28872 8.88464 7.11773 8.85738 6.69463 8.58067C6.45941 8.4267 6.14411 8.49272 5.99029 8.72793C5.83647 8.96305 5.90239 9.2784 6.13756 9.43222C6.58976 9.72802 6.91938 9.84258 7.33163 9.88133V10.1768H7.33157Z" fill="#332B2C" />
            <path d="M14.2533 6.82765H18.6814C18.9624 6.82765 19.1902 6.59985 19.1902 6.31883C19.1902 6.0378 18.9624 5.81 18.6814 5.81H14.2533C13.9723 5.81 13.7445 6.0378 13.7445 6.31883C13.7445 6.59985 13.9723 6.82765 14.2533 6.82765Z" fill="#332B2C" />
            <path d="M12.226 8.86287H18.6814C18.9624 8.86287 19.1902 8.63507 19.1902 8.35404C19.1902 8.07307 18.9624 7.84521 18.6814 7.84521H12.226C11.945 7.84521 11.7172 8.07302 11.7172 8.35404C11.7172 8.63507 11.945 8.86287 12.226 8.86287Z" fill="#332B2C" />
            <path d="M17.4303 12.4789H7.66715C7.38613 12.4789 7.15833 12.7067 7.15833 12.9877C7.15833 13.2687 7.38613 13.4965 7.66715 13.4965H17.4303C17.7113 13.4965 17.9391 13.2687 17.9391 12.9877C17.9391 12.7067 17.7113 12.4789 17.4303 12.4789Z" fill="#332B2C" />
            <path d="M17.4303 15.0229H7.66715C7.38613 15.0229 7.15833 15.2508 7.15833 15.5318C7.15833 15.8128 7.38613 16.0406 7.66715 16.0406H17.4303C17.7113 16.0406 17.9391 15.8128 17.9391 15.5318C17.9391 15.2508 17.7113 15.0229 17.4303 15.0229Z" fill="#332B2C" />
            <path d="M15.1115 18.5845C15.3926 18.5845 15.6204 18.3567 15.6204 18.0757C15.6204 17.7947 15.3926 17.5669 15.1115 17.5669H7.66715C7.38613 17.5669 7.15833 17.7947 7.15833 18.0757C7.15833 18.3567 7.38613 18.5845 7.66715 18.5845H15.1115Z" fill="#332B2C" />
            <path d="M17.4302 18.5845C17.7112 18.5845 17.939 18.3567 17.939 18.0757C17.939 17.7947 17.7112 17.5669 17.4302 17.5669C17.1492 17.5669 16.9214 17.7947 16.9214 18.0757C16.9214 18.3567 17.1492 18.5845 17.4302 18.5845Z" fill="#332B2C" />
        </svg>
    );

    const svgIcon2 = (
        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
            <path d="M29.4689 35.1501C32.1615 35.1501 34.352 32.9595 34.352 30.267V27.2001C35.0775 26.955 35.6014 26.2684 35.6014 25.4613C35.6014 24.4493 34.7781 23.626 33.7661 23.626C32.7541 23.626 31.9308 24.4493 31.9308 25.4613C31.9308 26.2684 32.4547 26.955 33.1801 27.2001V30.267C33.1801 32.3134 31.5152 33.9782 29.4689 33.9782C27.4225 33.9782 25.7577 32.3133 25.7577 30.267V27.2001C26.4831 26.955 27.007 26.2684 27.007 25.4613C27.007 24.4493 26.1837 23.626 25.1717 23.626C24.1597 23.626 23.3364 24.4493 23.3364 25.4613C23.3364 26.2684 23.8603 26.955 24.5858 27.2001V30.267C24.5858 32.9595 26.7764 35.1501 29.4689 35.1501ZM33.7661 24.7978C34.1319 24.7978 34.4295 25.0954 34.4295 25.4612C34.4295 25.827 34.1319 26.1246 33.7661 26.1246C33.4003 26.1246 33.1027 25.827 33.1027 25.4612C33.1027 25.0954 33.4003 24.7978 33.7661 24.7978ZM25.1717 24.7978C25.5375 24.7978 25.8351 25.0954 25.8351 25.4612C25.8351 25.827 25.5374 26.1246 25.1717 26.1246C24.806 26.1246 24.5083 25.827 24.5083 25.4612C24.5083 25.0954 24.806 24.7978 25.1717 24.7978Z" fill="#332B2C" />
            <path d="M3.032 39.9999H37.7741C38.6707 39.9999 39.3694 39.2201 39.2717 38.3293L38.5876 32.0868C38.5524 31.765 38.2637 31.5334 37.9413 31.5681C37.6197 31.6035 37.3875 31.8928 37.4227 32.2144L38.1068 38.4569C38.1284 38.655 37.9736 38.828 37.7741 38.828H21.1642H21.1634C20.9655 38.828 20.8089 38.6566 20.8307 38.4569L22.5206 23.0369C22.5392 22.867 22.6823 22.7388 22.8533 22.7388H36.0844C36.2553 22.7388 36.3984 22.867 36.4171 23.0369L37.1231 29.48C37.1583 29.8016 37.4457 30.0337 37.7694 29.9987C38.091 29.9633 38.3232 29.674 38.288 29.3524L37.5819 22.9093C37.498 22.1441 36.8543 21.567 36.0844 21.567H29.6019L28.697 13.3097C28.5833 12.2713 27.7097 11.4883 26.6652 11.4883H24.3339V8.14708C24.3339 3.65478 20.6792 0 16.1869 0C11.6946 0 8.03979 3.65478 8.03979 8.14708V11.4883H5.70863C4.664 11.4883 3.79046 12.2713 3.67671 13.3097L1.00015 37.7333C0.867729 38.9423 1.81627 39.9999 3.032 39.9999ZM2.16511 37.8609L4.84166 13.4374C4.89025 12.9944 5.263 12.6602 5.70871 12.6602H8.03986V14.8422C7.27438 15.09 6.71913 15.8094 6.71913 16.6564C6.71913 17.7077 7.57446 18.563 8.62582 18.563C9.67717 18.563 10.5325 17.7077 10.5325 16.6564C10.5325 15.8094 9.97726 15.09 9.21177 14.8422V12.6602H14.8197C15.1434 12.6602 15.4057 12.3979 15.4057 12.0743C15.4057 11.7507 15.1434 11.4883 14.8197 11.4883H9.21177V8.14708C9.21177 4.30097 12.3408 1.1719 16.1869 1.1719C20.0331 1.1719 23.1621 4.30097 23.1621 8.14708V11.4883H17.5542C17.2305 11.4883 16.9682 11.7507 16.9682 12.0743C16.9682 12.3979 17.2305 12.6602 17.5542 12.6602H23.1621V14.8422C22.3966 15.09 21.8415 15.8094 21.8415 16.6564C21.8415 17.7077 22.6967 18.563 23.7481 18.563C24.7994 18.563 25.6548 17.7077 25.6548 16.6564C25.6548 15.8094 25.0995 15.09 24.334 14.8422V12.6602H26.6653C27.1109 12.6602 27.4836 12.9943 27.5322 13.4374L28.423 21.567H22.8534C22.0834 21.567 21.4396 22.1441 21.3558 22.9094L19.6659 38.3294C19.6475 38.4972 19.6623 38.6858 19.6948 38.8281H3.032C2.51246 38.828 2.10846 38.3786 2.16511 37.8609ZM8.62574 15.9216C9.03098 15.9216 9.36052 16.2512 9.36052 16.6564C9.36052 17.0615 9.0309 17.3911 8.62574 17.3911C8.22057 17.3911 7.89095 17.0615 7.89095 16.6564C7.89095 16.2512 8.22049 15.9216 8.62574 15.9216ZM23.748 15.9216C24.1532 15.9216 24.4828 16.2512 24.4828 16.6564C24.4828 17.0615 24.1532 17.3911 23.748 17.3911C23.3428 17.3911 23.0133 17.0615 23.0133 16.6564C23.0133 16.2512 23.3429 15.9216 23.748 15.9216Z" fill="#332B2C" />
        </svg>
    );

    const svgIcon3 = (
        <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
            <path d="M32.0475 18.7287C32.3268 18.3213 32.3873 17.8028 32.2092 17.342C31.687 15.9907 30.363 15.0828 28.9145 15.0828H26.8692V13.2518C27.5564 13.0089 28.0503 12.353 28.0503 11.5836V10.7189C28.0503 10.2203 27.6445 9.81455 27.1459 9.81455H25.4164C24.9178 9.81455 24.5122 10.2203 24.5122 10.7189V11.5836C24.5122 12.353 25.006 13.0089 25.6932 13.2518V15.0828H21.9728V10.8498C22.0438 10.0233 21.2737 9.18915 20.6745 8.63997V6.44737C20.6745 6.12256 20.4113 5.85938 20.0865 5.85938C19.7618 5.85938 19.4985 6.12256 19.4985 6.44737V8.63997C18.9005 9.21369 18.1786 9.89804 18.2002 10.8498V15.0828H14.4799V13.2518C15.1671 13.0089 15.661 12.353 15.661 11.5836V10.7189C15.661 10.2203 15.2553 9.81455 14.7566 9.81455H13.0271C12.5285 9.81455 12.1228 10.2203 12.1228 10.7189V11.5836C12.1228 12.353 12.6166 13.0089 13.3039 13.2518V15.0828H11.2905C9.84192 15.0828 8.51783 15.9907 7.99577 17.342C7.62424 18.2172 8.33164 19.3925 9.39277 19.3794H16.9256V20.7267C16.9256 21.6801 17.7012 22.4557 18.6546 22.4557H19.5145V30.3329L16.7572 32.552C16.1326 32.9706 16.3938 34.135 17.2732 34.1407L22.9328 34.1376C23.7013 34.1567 24.1467 33.0814 23.4467 32.5482L20.6905 30.3405V22.4557H21.5505C22.5038 22.4557 23.2794 21.6801 23.2794 20.7267V18.7914C23.2794 18.4665 23.0162 18.2034 22.6914 18.2034H9.39285C9.24899 18.1714 9.05189 18.1547 9.09281 17.7658C9.44106 16.8644 10.3243 16.2587 11.2906 16.2587H28.9145C29.8807 16.2587 30.764 16.8644 31.1122 17.7658C31.1342 17.9116 31.1898 18.1014 30.8122 18.2034H25.4964C25.1716 18.2034 24.9084 18.4665 24.9084 18.7914C24.9084 19.1162 25.1716 19.3794 25.4964 19.3794H30.8123C31.3063 19.3794 31.768 19.1362 32.0475 18.7287ZM25.6882 10.9905H26.8743V11.5835C26.8743 11.9106 26.6083 12.1766 26.2813 12.1766C25.9542 12.1766 25.6882 11.9105 25.6882 11.5835L25.6882 10.9905ZM13.2988 10.9905H14.485V11.5835C14.485 11.9106 14.2189 12.1766 13.8919 12.1766C13.5649 12.1766 13.2988 11.9105 13.2988 11.5835V10.9905ZM18.1207 32.9642L20.0982 31.3727L22.0824 32.962L18.1207 32.9642ZM22.1034 19.3794V20.7267C22.1034 21.0316 21.8553 21.2797 21.5504 21.2797H18.6546C18.3497 21.2797 18.1016 21.0316 18.1016 20.7267V19.3794H22.1034ZM19.3763 15.0828V10.8498C19.8244 9.17316 20.5884 9.81368 20.7969 10.8498V15.0828H19.3763Z" fill="#332B2C" />
            <path d="M9.63189 26.6322C9.60571 26.5615 9.57458 26.4935 9.54142 26.4269C10.694 26.5815 11.8048 25.8229 11.8163 24.6192C11.8163 23.6224 11.0053 22.8114 10.0085 22.8114H3.74974V16.5846C3.74974 16.2598 3.48648 15.9966 3.16175 15.9966C2.83702 15.9966 2.57375 16.2598 2.57375 16.5846V22.8913C2.57375 23.4957 3.06547 23.9873 3.66985 23.9873H10.0084C10.3568 23.9873 10.6402 24.2707 10.6402 24.6191C10.6402 24.9675 10.3568 25.2509 10.0084 25.2509H3.66985C2.36874 25.2509 1.31027 24.1925 1.31027 22.8914V12.6081C1.31027 12.2598 1.59368 11.9763 1.94201 11.9763C2.29034 11.9763 2.57375 12.2597 2.57375 12.6081V13.8159C2.57375 14.1407 2.83702 14.4039 3.16175 14.4039C3.48648 14.4039 3.74974 14.1407 3.74974 13.8159V12.6081C3.74974 11.6113 2.93878 10.8003 1.94201 10.8003C0.945241 10.8003 0.134277 11.6113 0.134277 12.6081V22.8914C0.134277 24.738 1.5577 26.2576 3.3648 26.4129C3.31808 26.5056 3.277 26.6021 3.24368 26.7029L1.03822 33.368C0.936225 33.6764 1.10345 34.009 1.41172 34.111C1.72006 34.2131 2.05263 34.0457 2.15463 33.7375L4.36016 27.0723C4.48787 26.6863 4.84686 26.4269 5.2536 26.4269H7.6469C8.03858 26.4269 8.39318 26.6737 8.52928 27.0409L11.0188 33.7571C11.1528 33.9679 11.3479 34.2369 11.7745 34.1041C12.079 33.9913 12.2343 33.6529 12.1214 33.3484L9.63189 26.6322Z" fill="#332B2C" />
            <path d="M40.1336 22.8914V12.6081C40.1336 11.6113 39.3226 10.8003 38.3259 10.8003C37.329 10.8003 36.5181 11.6113 36.5181 12.6081V22.8114H30.2594C29.2626 22.8114 28.4516 23.6224 28.4516 24.6192C28.4381 25.8106 29.5874 26.5775 30.7264 26.4269C30.6932 26.4935 30.6621 26.5615 30.6359 26.6322L28.1464 33.3484C28.0336 33.6529 28.1889 33.9912 28.4934 34.1041C28.718 34.1808 29.0764 34.1247 29.2491 33.7571L31.7386 27.041C31.8748 26.6737 32.2295 26.4269 32.6211 26.4269H35.0144C35.421 26.4269 35.7801 26.6864 35.9078 27.0724L38.1133 33.7375C38.2153 34.0458 38.5477 34.2131 38.8563 34.111C39.1646 34.009 39.3318 33.6764 39.2298 33.368L37.0243 26.703C36.991 26.6022 36.95 26.5057 36.9032 26.4131C38.6119 26.3043 40.1709 24.7062 40.1336 22.8914ZM38.9576 22.8914C38.9826 24.0809 37.9102 25.2739 36.598 25.2509H30.2594C29.4794 25.2297 29.4165 24.0532 30.2594 23.9875H36.598C37.2024 23.9875 37.6941 23.4958 37.6941 22.8914V12.6081C37.6941 12.2598 37.9775 11.9763 38.3259 11.9763C38.6743 11.9763 38.9576 12.2597 38.9576 12.6081V22.8914Z" fill="#332B2C" />
        </svg>
    );

    const dataByFilter = {
        anno: [],
        mese: [],
        settimana: [],
    };

    const dataset = dataByFilter[filter] || [];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                if (!user?._id) return;
                const data = await get(`/categories/${user._id}`);
                setCategories(data);
            } catch (err) {
                console.error("Errore nel caricamento categorie dashboard:", err);
            }
        };
        fetchCategories();
    }, [user]);


    return (
        <div className="max-w-[972px] w-full px-4">

            {/* InfoBoxes */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <div className="w-full sm:w-auto flex-1">
                    <InfoBox title="Totale fatturato" value="87.561,80" unit=" €" icon={svgIcon1} />
                </div>
                <div className="w-full sm:w-auto flex-1">
                    <InfoBox title="Ordini totali" value="347" unit="" icon={svgIcon2} />
                </div>
                <div className="w-full sm:w-auto flex-1">
                    <InfoBox title="Clienti registrati" value="873" unit="" icon={svgIcon3} />
                </div>
            </div>

            {/* Turnover Chart + Best Sellers */}
            <div className="flex flex-col gap-7 mt-10 lg:flex-row">

                {/* Turnover Chart card */}
                <div className="w-full lg:w-[58%] bg-white rounded-3xl shadow-elevation-1 p-6 sm:p-11">
                    <div className="flex flex-row gap-2 justify-between">
                        <div className="">
                            <h4 className="text-md text-text font-bold leading-tight">Fatturato</h4>
                            <p className="mt-2 text-xs text-muted mb-2 sm:mb-0">Lorem ipsum dolor sit amet.</p>
                        </div>
                        <select
                            value={category}
                            onChange={(e) => dispatch(setCategory(e.target.value))}
                            className="text-xs ml-auto border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto"
                        >
                            <option value="Tutti">Tutte le categorie</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        <select
                            className="text-xs border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="anno">Anno</option>
                            <option value="mese">Mese</option>
                            <option value="settimana">Settimana</option>
                        </select>
                    </div>

                    {/* Payment type filter */}
                    <div className="mt-6 flex flex-row gap-3 sm:mt-11 sm:gap-2">
                        {["Tutti", "Pagati in app", "Pagati in cassa"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setPaymentFilter(type)}
                                className={`py-1.5 px-3 min-w-[110px] rounded-full text-sm text-center ${paymentFilter === type ? "bg-secondary text-white" : "bg-blue-light text-text"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>


                    <div className="mt-10">
                        <LineChartTurnover dataset={dataset} filter={filter} />
                    </div>
                </div>

                {/* Best sellers card */}
                <div className="w-full lg:w-[42%] bg-white rounded-3xl shadow-elevation-1 p-6 sm:p-11 flex flex-col">
                    <h4 className="text-md text-text font-bold leading-tight">In tendenza questa settimana</h4>
                    <p className="mt-2 text-xs text-muted">Lorem ipsum dolor sit amet.</p>
                    <div className="mt-11 max-h-[280px] overflow-y-auto scrollbar-hover pr-5">
                        <BestSellersList />
                    </div>
                </div>
            </div>

            {/* Doughnut Charts + New Customers Chart */}
            <div className="flex flex-col sm:flex-row mt-9 gap-7">
                <div className="flex flex-row sm:flex-col justify-between lg:w-[35%] gap-3 sm:gap-4">

                    {/* Chart App Payments card */}
                    <div className="bg-white items-center gap-2 flex flex-row rounded-3xl shadow-elevation-1 p-4 sm:p-4 sm:w-auto">
                        <div className="relative w-[47%]">
                            <DoughnutChartAppPayments />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-text">85%</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-base font-semibold text-text leading-tight">Pagamenti in app</h4>
                            <p className="mt-2 text-xl text-text font-bold">585</p>
                        </div>
                    </div>

                    {/* Chart Positive Rewievs card */}
                    <div className="bg-white items-center gap-2 flex flex-row rounded-3xl shadow-elevation-1 p-4 sm:p-4 sm:w-auto">
                        <div className="relative w-[47%]">
                            <DoughnutChartPositiveRewievs />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-text">63%</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-base font-semibold text-text leading-tight">Recensioni Positive</h4>
                            <p className="sm:mt-2 text-base sm:text-xs text-muted">4 e 5 stelle</p>
                            <p className="mt-2 text-xl text-text font-bold">157</p>
                        </div>
                    </div>
                </div>

                {/* New customers card */}
                <div className="bg-white flex flex-col flex-1 gap-4 rounded-3xl shadow-elevation-1 p-6 sm:p-11 sm:w-auto">
                    <div className="flex flex-row gap-4 justify-between">
                        <div>
                            <h4 className="text-md text-text font-bold leading-tight">Nuovi clienti registrati</h4>
                            <p className="mt-2 text-xs text-muted mb-2 sm:mb-0">Lorem ipsum dolor sit amet.</p>
                        </div>
                        <select
                            className="text-xs border border-gray-300 rounded-lg px-4 py-2 mt-4 sm:mt-0"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="anno">Anno</option>
                            <option value="mese">Mese</option>
                            <option value="settimana">Settimana</option>
                        </select>
                    </div>
                    <div className="mt-10 h-[160px]">
                        <VerticalBarChartNewCustomers dataset={dataset} filter={filter} />
                    </div>
                </div>
            </div>
            {/* Best sellers ever */}
            <div className="flex flex-col mt-11 mb-20 gap-7">
                <h4 className="text-md text-text font-bold leading-tight">I preferiti di sempre</h4>
                <BestSellersEver />
            </div>
        </div>
    );

}

export default Dashboard;