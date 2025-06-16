import React from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
const fallbackImage = "https://placehold.co/198x198?text=Immagine+non+disponibile";

const CustomImagePreview = ({ src, alt = "Anteprima piatto", className = "" }) => {
  if (!src || typeof src !== "string" || src.trim() === "") {
    return (
      <img
        src={fallbackImage}
        alt={alt}
        className={className}
      />
    );
  }

  const resolvedSrc = src.startsWith("/assets")
    ? `${SERVER_URL}${src}`
    : src;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      crossOrigin="anonymous"
      onError={(e) => (e.currentTarget.src = fallbackImage)}
    />
  );
};

export default CustomImagePreview;
