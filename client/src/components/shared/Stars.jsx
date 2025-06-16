import CustomImage from "./CustomImage";

const Stars = ({ rating }) => {
  return (
    <div className="flex items-center flex-wrap">
      <CustomImage
        src={
          rating >= 1
            ? "/images/business_images/Star.png"
            : "/images/business_images/Star_empty.png"
        }
      />
      <CustomImage
        src={
          rating >= 2
            ? "/images/business_images/Star.png"
            : "/images/business_images/Star_empty.png"
        }
      />
      <CustomImage
        src={
          rating >= 3
            ? "/images/business_images/Star.png"
            : "/images/business_images/Star_empty.png"
        }
      />
      <CustomImage
        src={
          rating >= 4
            ? "/images/business_images/Star.png"
            : "/images/business_images/Star_empty.png"
        }
      />
      <CustomImage
        src={
          rating >= 5
            ? "/images/business_images/Star.png"
            : "/images/business_images/Star_empty.png"
        }
      />
    </div>
  );
};

export default Stars;
