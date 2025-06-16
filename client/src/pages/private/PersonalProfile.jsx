import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";



// Icone SVG inline
const icons = {
  
  user: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_1055_1676)">
        <path
          d="M8.1626 0.5C5.98177 0.5 4.20752 2.27425 4.20752 4.45508C4.20752 6.63591 5.98177 8.41016 8.1626 8.41016C10.3434 8.41016 12.1177 6.63591 12.1177 4.45508C12.1177 2.27425 10.3434 0.5 8.1626 0.5Z"
          fill="#332B2C"
        />
        <path
          d="M13.0835 10.994C12.0007 9.89454 10.5652 9.28906 9.0415 9.28906H7.28369C5.76002 9.28906 4.32453 9.89454 3.24172 10.994C2.16421 12.0881 1.5708 13.5322 1.5708 15.0605C1.5708 15.3032 1.76756 15.5 2.01025 15.5H14.3149C14.5576 15.5 14.7544 15.3032 14.7544 15.0605C14.7544 13.5322 14.161 12.0881 13.0835 10.994Z"
          fill="#332B2C"
        />
      </g>
      <defs>
        <clipPath id="clip0_1055_1676">
          <rect
            width="15"
            height="15"
            fill="white"
            transform="translate(0.662598 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  mail: (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
      <path
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
        fill="#000"
      />
    </svg>
  ),
  phone: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_1055_36)">
        <path
          d="M7.21421 4.38991L3.32802 0.503723L1.37432 2.45004C0.824129 3.00023 0.591061 3.75 0.681622 4.67917C1.05969 8.55704 7.64158 15.4963 11.7674 15.4963C12.5524 15.4963 13.2146 15.2478 13.7163 14.7461L15.6626 12.8287L11.7765 8.94164L9.79881 10.8955C9.6486 11.0466 9.41214 11.0728 9.24947 10.9582C8.60098 10.4986 7.89478 9.94666 7.26603 9.31791C6.45362 8.50506 5.68067 7.57953 5.19869 6.9405C5.06222 6.75938 5.07766 6.51433 5.23472 6.35767L7.21421 4.38991Z"
          fill="#332B2C"
        />
        <path
          d="M13.9045 6.65636H14.7835C14.7835 3.74826 12.4179 1.38266 9.50977 1.38266V2.26161C11.9329 2.26161 13.9045 4.23324 13.9045 6.65636Z"
          fill="#332B2C"
        />
        <path
          d="M9.50977 4.01951C10.9638 4.01951 12.1466 5.20232 12.1466 6.65636H13.0256C13.0256 4.71778 11.4483 3.14056 9.50977 3.14056V4.01951Z"
          fill="#332B2C"
        />
        <path
          d="M9.50977 5.77742C9.9943 5.77742 10.3887 6.17183 10.3887 6.65637H11.2677C11.2677 5.68686 10.4793 4.89847 9.50977 4.89847V5.77742Z"
          fill="#332B2C"
        />
      </g>
      <defs>
        <clipPath id="clip0_1055_36">
          <rect
            width="15"
            height="15"
            fill="white"
            transform="translate(0.662598 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  pin: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_1055_343)">
        <path
          d="M8.1626 0.5C4.99634 0.5 2.42041 3.07593 2.42041 6.24219C2.42041 7.25568 2.68818 8.2521 3.19476 9.12368C3.31285 9.32689 3.44486 9.5249 3.58719 9.71226L7.91311 15.5H8.41206L12.738 9.71229C12.8803 9.5249 13.0123 9.32691 13.1304 9.12371C13.637 8.2521 13.9048 7.25568 13.9048 6.24219C13.9048 3.07593 11.3289 0.5 8.1626 0.5ZM8.1626 8.14648C7.11257 8.14648 6.2583 7.29222 6.2583 6.24219C6.2583 5.19216 7.11257 4.33789 8.1626 4.33789C9.21263 4.33789 10.0669 5.19216 10.0669 6.24219C10.0669 7.29222 9.21263 8.14648 8.1626 8.14648Z"
          fill="#332B2C"
        />
      </g>
      <defs>
        <clipPath id="clip0_1055_343">
          <rect
            width="15"
            height="15"
            fill="white"
            transform="translate(0.662598 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  close: (
    <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="14" fill="#F3F3F3" />
      <path
        d="M18 10l-8 8M10 10l8 8"
        stroke="#231F20"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function PersonalProfile() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
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
          <h1 className="w-full font-semibold text-md">Profilo Personale</h1>
        </div>
      </div>
      {/* Form */}
      <div
        className="flex flex-col gap-2 rounded-4xl p-2 bg-white w-[375px] px-6 py-7 mt-4"
        style={{
          boxShadow: "0 -3px 12px -5px rgba(0, 0, 0, 0.18)",
        }}
      >
        <form className="flex flex-col items-center gap-9">
          {/* Nome */}
          <div className="flex items-center w-[303px] h-[42px] bg-white rounded-lg border border-[#E5E5E5] px-3 shadow-md gap-2">
            <span className="mr-2">{icons.user}</span>
            <input
              className="border-none outline-none bg-transparent text-sm flex-1"
              placeholder="Nome *"
              value={user.first_name}
            />
          </div>
          {/* Cognome */}
          <div className="flex items-center w-[303px] h-[42px] bg-white rounded-lg border border-[#E5E5E5] shadow-md gap-2 px-3">
            <span className="mr-2">{icons.user}</span>
            <input
              className="border-none outline-none bg-transparent text-sm flex-1"
              placeholder="Cognome *"
              value={user.last_name}
            />
          </div>
          {/* Email */}
          <div className="flex items-center w-[303px] h-[42px] bg-white rounded-lg border border-[#E5E5E5] shadow-md gap-2 px-3">
            <span className="mr-2">{icons.mail}</span>
            <input
              className="border-none outline-none bg-transparent text-sm flex-1"
              placeholder="Email *"
              value={user.email}
              type="email"
            />
          </div>
          {/* Telefono */}
          <div className="flex items-center w-[303px] h-[42px] bg-white rounded-lg border border-[#E5E5E5] shadow-md gap-2 px-3">
            <span className="mr-2">{icons.phone}</span>
            <input
              className="border-none outline-none bg-transparent text-sm flex-1"
              placeholder="Telefono"
              value={user.phone}
              type="tel"
            />
          </div>

          {/* Bottone Salva */}
          <div
            className="fixed bottom-0 py-6 left-[50%] w-full bg-white pt-4 flex justify-center z-0"
            style={{ transform: "translateX(-50%)" }}
          >
            <button
              type="submit"
              className="bg-[#36C9E9] text-white font-semibold text-base rounded-full shadow-md w-[303px] h-[42px] active:scale-95 transition z-10 "
            >
              Salva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
