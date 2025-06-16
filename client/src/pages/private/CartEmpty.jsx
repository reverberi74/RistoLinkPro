import React from "react";
import { useNavigate } from 'react-router-dom';

export default function CartEmpty() {
    const navigate = useNavigate();
    return (
        <div
            className="absolute bg-white flex flex-col"
            style={{
                width: "375px",
                height: "812px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            {/* BODY */}
            <div className="relative flex-1 w-full mt-[130px] flex flex-col items-center pt-8 px-4">

                {/* Icona deserto (video animato) */}
                <div className="flex justify-center items-center w-full mt-2 mb-2 z-10">
                    <video
                        width="256"
                        height="256"
                        preload="none"
                        style={{
                            background: "transparent url('https://cdn-icons-png.flaticon.com/512/17507/17507665.png') 50% 50% / fit no-repeat"
                        }}
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="https://cdn-icons-mp4.flaticon.com/512/17507/17507665.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* Testo */}
                <div className="text-center mb-8 z-10 mt-[30px]">
                    <h3 className="text-2xl font-semibold text-[#231F20] mb-2">
                        Non hai ancora scelto nulla
                    </h3>
                    <p className="text-[#A0A0A0] text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </div>

                {/* Bottone */}
                <button
                    onClick={() => navigate('/private/categories')}
                    style={{ width: '273px', height: '39px' }}
                    className="w-[206px] h-[38px] bg-[#36C9E9] cursor-pointer rounded-full text-white font-semibold text-base shadow-md active:scale-95 transition z-10"
                >
                    Torna al menu
                </button>
            </div>
        </div>
    );
}
