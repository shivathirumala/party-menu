import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';

const VegBadge = ({ type }) => (
  <span className={`inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded border-2 flex-shrink-0
    ${type === 'veg' ? 'border-green-600' : 'border-red-600'}`}>
    <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${type === 'veg' ? 'bg-green-600' : 'bg-red-600'}`}></span>
  </span>
);

const DishCard = ({ dish }) => {
  const navigate = useNavigate();
  const { addDish, removeDish, isDishSelected } = useMenu();
  const [imgError, setImgError] = useState(false);
  const selected = isDishSelected(dish.id);

  return (
    <div
      id={`dish-card-${dish.id}`}
      className={`animate-fade-slide border-b border-gray-100 transition-all duration-200
        ${selected
          ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-l-primary'
          : 'bg-white hover:bg-orange-50/30'
        }`}
    >
      <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 md:p-5">

        {/* Left: Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-1.5 sm:gap-2">
          {/* Name row */}
          <div className="flex items-center gap-2">
            <VegBadge type={dish.type} />
            <span className="text-sm sm:text-base md:text-[15px] font-bold text-gray-900 leading-tight line-clamp-1">
              {dish.name}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2">
            {dish.description}{' '}
            <span
              className="text-orange-500 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate(`/ingredients/${dish.id}`)}
            >
              Read more
            </span>
          </p>

          {/* Ingredient button */}
          <button
            id={`ingredient-btn-${dish.id}`}
            onClick={() => navigate(`/ingredients/${dish.id}`)}
            className="self-start flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-orange-500 border border-orange-400 rounded-md px-2.5 py-1 hover:bg-orange-50 hover:shadow-sm transition-all duration-200 active:scale-95"
          >
            <span>🍽️</span> Ingredient
          </button>
        </div>

        {/* Right: Image + button */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="w-24 h-16 sm:w-28 sm:h-20 md:w-32 md:h-22 lg:w-36 lg:h-24 rounded-xl overflow-hidden shadow-card relative group">
            <img
              src={imgError
                ? `https://placehold.co/144x96/FF8C00/ffffff?text=${encodeURIComponent(dish.name)}`
                : dish.image}
              alt={dish.name}
              onError={() => setImgError(true)}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {selected ? (
            <button
              id={`remove-btn-${dish.id}`}
              onClick={() => removeDish(dish.id)}
              className="w-24 sm:w-28 md:w-32 lg:w-36 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold bg-primary text-white border-2 border-primary hover:bg-orange-700 hover:border-orange-700 transition-all duration-200 active:scale-95 shadow-tab"
            >
              Remove
            </button>
          ) : (
            <button
              id={`add-btn-${dish.id}`}
              onClick={() => addDish(dish)}
              className="w-24 sm:w-28 md:w-32 lg:w-36 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-200 active:scale-95"
            >
              Add +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishCard;
