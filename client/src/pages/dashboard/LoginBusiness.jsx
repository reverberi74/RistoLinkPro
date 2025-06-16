import { useNavigate } from "react-router-dom";
import logoqr from "../../../public/images/high-angle-qr-code-note.jpg";
import logotable from "../../../public/images/Logo-TableLink .png";
import { toast } from "react-toastify";
import { useApi } from "../../hooks/useApi";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../../store/slices/authSlice";
import { useEffect, useState } from "react";

const LoginBusiness = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useApi()

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInput = ({ target: { name, value } }) => {
    setForm(f => ({ ...f, [name]: value }));
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); // Previene il refresh della pagina al submit
    console.log(form);

    try {
      const data = await login({ ...form, role: "business" });

      dispatch(loginAction(data));
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.log(err);
      toast.error("Utente non trovato")
    }

  };

  return (
    <div
      className="bg-white max-w-[1440px] w-full h-[80vh] rounded-[20px] flex flex-row justify-between items-center shadow-lg mx-auto my-auto mt-10"
      style={{
        boxShadow: "0 -3px 12px -5px rgba(0, 0, 0, 0.18)",
      }}
    >
      {/* Left Card */}
      <div className="min-w-[578px] h-full rounded-2xl overflow-hidden flex flex-col bg-transparent relative p-8 ">
        {/* Immagine card */}
          <img
            src={logoqr}
            alt="QR Code"
            className="w-[578px] object-cover rounded-2xl h-full"
          />
        {/* Primo testo nell'immagine */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[412px] text-white font-inter">
          <h3 className="text-[24px] font-extrabold leading-[26px] align-middle mb-2">
            Metti il turbo al tuo <br /> ristorante!
          </h3>
          <p className="text-base font-normal leading-relaxed ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore quam voluptatem nulla cum amet? Mollitia ut ipsum repellat pariatur nihil vitae. Magni recusandae nostrum maiores ad nemo nesciunt quibusdam et!
          </p>
        </div>

        {/* Contenitore grigio della card */}
        <div className="max-w-[514px] absolute bottom-8 left-8 bg-[#bfb7b3] flex flex-col px-12 py-10 rounded-b-2xl">
          <h3 className="text-white text-[26px] mb-1 font-inter font-semibold leading-[24px] align-middle">
            Non hai ancora un account?
          </h3>
          <p className="text-white text-[14px] mb-4 max-w-[450px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            tincidunt, velit vel fermentum mollis.
          </p>

          <button className="w-full max-w-xs h-10 rounded-full border border-white text-white font-semibold text-lg hover:bg-white/10 transition">
            Provalo GRATIS
          </button>
        </div>
      </div>

      {/* Card destra */}
      <div className=" w-full max-h-full bg-white rounded-3xl p-16 flex flex-col justify-center items-center relative">
        {/* Logo parte destra */}
        <div className="flex justify-center items-center mb-6 w-[324px] h-[270px]">
          <img src="../../../public/images/Logo-qr-sm.png" alt="Logo Table Link" className="inline-block" />
        </div>

        <div className="max-w-[273px] w-full flex flex-col items-center">
          {/* Benvenuto */}
          <div className="w-full mb-6 mt-[3%] text-center">
            <h2 className="text-xl font-semibold mb-1">Benvenuto!</h2>
            <p className="text-gray-400 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Form */}
          <form className="w-full flex flex-col" onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <span className="absolute w-[18px] h-[18px] inset-y-0 left-0 flex items-center m-3 text-text">
                  {/* Icona Email */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M15.1729 15.9297C14.526 16.3609 13.7747 16.5889 13 16.5889C12.2254 16.5889 11.474 16.3609 10.8272 15.9297L0.173113 8.82677C0.114004 8.78736 0.056418 8.74628 0 8.70403V20.3429C0 21.6774 1.08291 22.7364 2.39347 22.7364H23.6065C24.9409 22.7364 25.9999 21.6535 25.9999 20.3429V8.70398C25.9434 8.74633 25.8857 8.78752 25.8265 8.82697L15.1729 15.9297Z"
                      fill="#332B2C"
                    />
                    <path
                      d="M1.01816 7.55918L11.6722 14.6622C12.0755 14.931 12.5377 15.0655 12.9999 15.0655C13.4622 15.0655 13.9245 14.931 14.3278 14.6622L24.9818 7.55918C25.6194 7.13439 26 6.42345 26 5.65615C26 4.3368 24.9266 3.26349 23.6073 3.26349H2.39266C1.07336 3.26354 0 4.33685 0 5.65742C0 6.42345 0.380656 7.13439 1.01816 7.55918Z"
                      fill="#332B2C"
                    />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border-2 border-gray-300 rounded-lg shadow-elevation-1 p-6 pl-10 pr-3 py-2 w-full bg-white focus:outline-none focus:ring-blue-400"
                  required
                  onInput={handleInput}
                  value={form.email}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 w-[18px] h-[18px] left-0 flex items-center m-3 text-text">
                  {/* Icona Password */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                  >
                    <path
                      d="M21.4783 10.7391H20.6307V7.63044C20.6307 3.42281 17.2079 0 13.0003 0C8.79266 0 5.36985 3.42281 5.36985 7.63044V10.7391H4.52175C3.11922 10.7391 1.97827 11.8801 1.97827 13.2826V23.4565C1.97827 24.859 3.11922 26 4.52175 26H21.4783C22.8808 26 24.0218 24.859 24.0218 23.4565V13.2826C24.0217 11.8801 22.8808 10.7391 21.4783 10.7391ZM13.8478 19.0611V21.7609C13.8478 22.2291 13.4682 22.6087 13 22.6087C12.5318 22.6087 12.1521 22.2291 12.1521 21.7609V19.0611C11.1668 18.7105 10.4574 17.7799 10.4565 16.6739C10.4576 15.2689 11.595 14.1316 13 14.1304C14.405 14.1316 15.5423 15.2689 15.5435 16.6739C15.5426 17.7799 14.8331 18.7105 13.8478 19.0611ZM17.2394 10.7391H8.76112V7.63044C8.76112 5.29232 10.6621 3.39132 13.0002 3.39132C15.3384 3.39132 17.2394 5.29232 17.2394 7.63044V10.7391H17.2394Z"
                      fill="#332B2C"
                    />
                  </svg>
                </span>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="border-2 border-gray-300 rounded-lg shadow-elevation-1 p-6 pl-10 pr-3 py-2 w-full bg-white focus:outline-none focus:ring-blue-400"
                  required
                  name="password"
                  onInput={handleInput}
                  value={form.password}
                />
              </div>
            </div>

            <div className="text-right text-xs mb-4 w-full">
              Hai dimenticato la tua password?
              <a href="#" className="text-blue-400 ml-1 hover:underline">
                Clicca qui
              </a>
            </div>

            {/* Pulsante Login */}
            <button
              type="submit"
              className="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold transition-all w-[273px] h-[39px] rounded-full py-2 px-4 cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginBusiness;
