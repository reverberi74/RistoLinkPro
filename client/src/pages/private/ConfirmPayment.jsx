import BackButton from "../../components/shared/BackButton";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { useToast } from "../../hooks/useToast";
import JSConfetti from "js-confetti";
import { useApi } from "../../hooks/useApi";
import CustomImage from "../../components/shared/CustomImage";

export default function ConfirmPayment() {
  const [rating, setRating] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [feedback, setFeedback] = useState("");
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [_, setShowThanks] = useState(false);
  const jsConfettiRef = useRef(null);

  if (!jsConfettiRef.current) {
    jsConfettiRef.current = new JSConfetti();
  }

  const canSubmit = rating > 0 || feedback.trim() !== "";

  const handleCelebrate = async () => {
    setIsCelebrating(true);
    if (rating >= 3) {
      await jsConfettiRef.current.addConfetti({
        confettiRadius: 12,
        confettiNumber: 180,
        colors: ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"],
      });
    } else if (rating >= 1 && rating <= 2) {
      await jsConfettiRef.current.addConfetti({
        emojis: ["😢", "😭", "😿"],
        emojiSize: 60,
        confettiNumber: 100,
      });
    }
    setIsCelebrating(false);
    setShowThanks(true);
    setTimeout(() => setShowThanks(false), 3000);
    setFeedback("");
    setRating(0);
  };

  const [content, setContent] = useState(""); // textarea
  const restaurantOwnerId = "6809247099bda8ef6880c799"; // ID statico per test
  const tableNumber = Math.floor(Math.random() * 20) + 1; // numero tavolo random da 1 a 20 (test)
  const { post } = useApi();

  const handleSubmitOrder = async () => {
    try {
      await post("/reviews", {
        user: restaurantOwnerId,
        content,
        table: tableNumber,
        rating,
      });
      handleCelebrate();

      toast.success("Il tuo feedback è stato inviato!");
      navigate("/private/categories");
    } catch (error) {
      toast.error("Errore durante l'invio del feedback.");
      console.error(error);
    }
  };

  console.log(rating);

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white mx-auto max-w-[23.4375rem] w-full font-sans">
        {/* Bottone paga in app */}

        <div className="flex pt-4 pl-4 pb-5 pr-3 items-center bg-white w-[23.4375rem] gap-5">
          <img
            className="cursor-pointer"
            src="/images/Component1.svg"
            alt="arrow"
            onClick={() =>
              navigate(location.key == "default" ? "/private" : -1)
            }
          />
          <h1 className="w-full font-semibold text-md">Paga in app</h1>
        </div>

        {/* Card */}
        <div
          className="flex flex-col items-center w-[375px] px-4 pb-24 rounded-t-3xl bg-white w-full h-10"
          style={{ boxShadow: "0 -3px 12px -5px rgba(0, 0, 0, 0.18)" }}
        >
          <div className="w-[375px] h-[665px] bg-white rounded-2xl shadow-2xl p-6 flex flex-col items-center mt-10">
            <h2 className="text-2xl font-extrabold mb-1 text-center">
              Grazie!
            </h2>
            <p className="text-gray-400 mb-6 text-center text-[15px]">
              Il tuo pagamento è andato a buon fine.
            </p>
            <div className="mb-3 flex justify-center">
              <div className="w-32 h-32 rounded-full border-black flex items-center justify-center">
                <img
                  src="/images/verified.gif"
                  alt="Verificato"
                  style={{
                    display: "block",
                    maxWidth: "173px",
                    maxHeight: "173px",
                    margin: "auto",
                    userSelect: "none",
                  }}
                />
              </div>
            </div>
            {/* Feedback */}
            <div className="w-full bg-gray-100 rounded-xl mt-10 p-4 flex flex-col items-center shadow-elevation-1 border border-gray-200 mb-10 ">
              <span className="font-bold text-xl mb-1 text-gray-800">
                Lascia un feedback
              </span>
              <span className="text-gray-400 text-sm mb-2">
                È gratis e ci aiuta a migliorare!
              </span>

              {/* feedback stelle */}
              <div className="flex justify-center items-center bg-white rounded-full shadow p-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    aria-label={`${star} stelle`}
                    className="focus:outline-none"
                    onClick={() => {
                      if (rating === star) {
                        setRating(rating - 1);
                      } else {
                        setRating(star);
                      }
                    }}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 48 48"
                      fill="none"
                      stroke="#3BC8E1"
                      strokeWidth="3"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    >
                      <polygon
                        points="24,6 30,19 44,19 32,28 36,42 24,34 12,42 16,28 4,19 18,19"
                        fill={star <= rating ? "#3BC8E1" : "none"}
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Finestra per scrivere la recensione */}
            <div
              className="mx-auto mb-4"
              style={{ width: 335, height: 73, borderRadius: 8 }}
            >
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-full p-3 border border-gray-300 resize-none 
                focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
                placeholder="raccontaci di più sulla tua esperienza"
                style={{ borderRadius: 8 }}
                name="content"
              />
            </div>

            {/* Bottone invia feedback */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={!canSubmit || isCelebrating}
                className={`
    bg-cyan-500 text-white flex items-center justify-center gap-2 rounded-full px-6 py-1.5 font-semibold
    w-[273px] h-[39px] mt-2 transition
    ${
      canSubmit && !isCelebrating
        ? "hover:scale-105 active:scale-95 shadow-lg"
        : "opacity-50 cursor-not-allowed"
    }
    animate-bounce
`}
                style={{ width: 273, height: 39, borderRadius: 99 }}
              >
                {isCelebrating ? "🎉" : "Invia feedback"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
