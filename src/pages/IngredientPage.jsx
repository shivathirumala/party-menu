import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import menuData from '../data/menuData.json';

const VegBadge = ({ type }) => (
  <span className={`inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex-shrink-0
    ${type === 'veg' ? 'border-green-600' : 'border-red-600'}`}>
    <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${type === 'veg' ? 'bg-green-600' : 'bg-red-600'}`}></span>
  </span>
);

const IngredientPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addDish, removeDish, isDishSelected } = useMenu();
  const [imgError, setImgError] = useState(false);

  const dish = menuData.dishes.find((d) => d.id === parseInt(id));

  if (!dish) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 sm:px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-800 hover:text-orange-500 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
        </header>
        <div className="flex flex-col items-center justify-center flex-1 gap-4">
          <span className="text-6xl">🍽️</span>
          <p className="text-lg font-bold text-gray-500">Dish not found</p>
        </div>
      </div>
    );
  }

  const selected = isDishSelected(dish.id);

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ─── Header ─── */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center gap-2">
          <button
            id="back-btn"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-gray-800 hover:text-orange-500 transition-colors active:scale-95"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Ingredient list
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-screen-xl mx-auto w-full pb-10">

        {/* ─── Hero Section ─── */}
        <div className="bg-gradient-to-b from-amber-50 to-white border-b border-gray-100">
          <div className="px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start">

            {/* Text Info */}
            <div className="flex-1 min-w-0 order-2 md:order-1">
              {/* Name row */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-3">
                <VegBadge type={dish.type} />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight flex-1">
                  {dish.name}
                </h1>
                {selected ? (
                  <button
                    id="hero-remove-btn"
                    onClick={() => removeDish(dish.id)}
                    className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-bold bg-primary text-white border-2 border-primary hover:bg-orange-700 transition-all duration-200 active:scale-95 shadow-tab"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    id="hero-add-btn"
                    onClick={() => addDish(dish)}
                    className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-bold text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all duration-200 active:scale-95"
                  >
                    Add +
                  </button>
                )}
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                <span className="font-bold text-gray-900">{dish.subCategory} </span>
                {dish.description}
              </p>

              {/* Ingredient tag */}
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full">
                🍽️ Ingredient
              </span>
            </div>

            {/* Image */}
            <div className="w-full md:w-80 lg:w-96 xl:w-[420px] order-1 md:order-2 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.14)] flex-shrink-0 group">
              <img
                src={imgError
                  ? `https://placehold.co/400x260/FF8C00/ffffff?text=${encodeURIComponent(dish.name)}`
                  : dish.image}
                alt={dish.name}
                onError={() => setImgError(true)}
                className="w-full aspect-video md:aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* ─── Ingredients Section ─── */}
        <div className="px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          <div className="flex items-baseline gap-3 mb-4 sm:mb-5">
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900">Ingredients</h2>
            <span className="text-xs sm:text-sm text-gray-400 font-medium">
              For {dish.ingredients.length > 4 ? '4' : '2'} people
            </span>
          </div>

          {/* Grid on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 rounded-xl border border-gray-100 overflow-hidden shadow-card">
            {dish.ingredients.map((ing, idx) => (
              <div
                key={idx}
                id={`ingredient-item-${idx}`}
                className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 bg-white hover:bg-orange-50/40 transition-colors border-b border-r border-gray-100 last:border-b-0"
              >
                <span className="text-sm sm:text-base font-medium text-gray-800">{ing.name}</span>
                <span className="text-xs sm:text-sm font-bold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-lg ml-2 flex-shrink-0">
                  {ing.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default IngredientPage;
