import React from "react";

// Inserisci il tuo SERVER_URL reale o importalo da config/env
const SERVER_URL = "http://localhost:3000";

const CustomImageBusiness = ({ src, alt, className, onClick, style = {} }) => {
  const fallbackImage = "https://placehold.co/600x400";
  const isValidSrc = src && src.trim() !== "";

  // Se l'immagine è relativa (/assets/...), prepend SERVER_URL
  const fullSrc = isValidSrc
    ? src.startsWith("/assets")
      ? `${SERVER_URL}${src}`
      : src
    : fallbackImage;

  return (
    <img
      src={fullSrc}
      alt={alt || "immagine"}
      className={className}
      style={style}
      crossOrigin="anonymous"
      onClick={onClick}
    />
  );
};

export default CustomImageBusiness;