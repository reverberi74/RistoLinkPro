import Stars from "./Stars";

const ReviewCard = ({ review }) => {
  return (
    <div className="p-6 shadow-elevation-1 bg-gray-50 rounded-xl grid-cols-1  ">
      <h1 className="font-bold py-3">
        Tavolo {review?.table} - {review?.author?.first_name}
      </h1>
      <div className="flex justify-between items-center md:flex-row py-3">
        <span>{new Date(review?.createdAt).toLocaleTimeString()}</span>
        <Stars rating={review?.rating} />
      </div>
      <div className="py-3">
        <span>{review?.content}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
