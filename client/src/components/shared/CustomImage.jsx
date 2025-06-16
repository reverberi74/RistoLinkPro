import React from "react";

const CustomImage = ({ src, alt, className, onClick, style = {} }) => {
  const fallbackImage = 'https://placehold.co/600x400';
  const isValidSrc = src && src.trim() !== "";

  return (
    <img
      crossOrigin="anonymous"
      className={className}
      src={isValidSrc ? src : fallbackImage}
      alt={alt || "immagine"}
      style={style}
      onClick={onClick}
    />
  );
};

export default CustomImage;