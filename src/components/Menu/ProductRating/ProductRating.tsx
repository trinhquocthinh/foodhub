import { memo } from 'react';
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';

interface MenuCardRatingProps {
  rating?: number;
}

const ProductRating = ({ rating = 5 }: MenuCardRatingProps) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<IoStar key={i} color="#FFD700" />); // Sao đầy
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<IoStarHalf key={i} color="#FFD700" />); // Nửa sao
    } else {
      stars.push(<IoStarOutline key={i} color="#FFD700" />); // Sao rỗng
    }
  }

  return (
    <div
      className="menu-card__rating flex items-center gap-1"
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
    >
      {stars}
      {/* <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span> */}
    </div>
  );
};

export default memo(ProductRating);
