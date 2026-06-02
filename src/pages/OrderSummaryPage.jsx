import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';

const VegBadge = ({ type }) => (
  <span className={`inline-flex items-center justify-center w-4 h-4 rounded border-2 flex-shrink-0
    ${type === 'veg' ? 'border-green-600' : 'border-red-600'}`}>
    <span className={`w-2 h-2 rounded-full ${type === 'veg' ? 'bg-green-600' : 'bg-red-600'}`}></span>
  </span>
);

const OrderSummaryPage = () => {
  const navigate = useNavigate();
  const { selectedDishes, removeDish, getTotalCount } = useMenu();
  const [confirmed, setConfirmed] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  const total = getTotalCount();

  // Group by category
  const grouped = selectedDishes.reduce((acc, dish) => {
    const key = dish.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(dish);
    return acc;
  }, {});

  const categoryOrder = ['Starter', 'Main Course', 'Dessert', 'Sides'];
  const sortedGroups = categoryOrder.filter((cat) => grouped[cat]);

  const categoryEmojis = {
    Starter: '🥗',
    'Main Course': '🍛',
    Dessert: '🍮',
    Sides: '🍞',
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex flex-col items-center justify-center px-6 gap-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-green-100 flex items-center justify-center shadow-lg">
            <span className="text-5xl sm:text-6xl">🎉</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">Order Confirmed!</h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-xs">
            Your party menu has been saved with <strong className="text-orange-500">{total} dishes</strong>. Enjoy your celebration!
          </p>
        </div>
        <button
          onClick={() => { setConfirmed(false); navigate('/'); }}
          className="mt-4 px-8 py-3 bg-primary text-white rounded-xl font-bold text-sm sm:text-base shadow-tab hover:bg-orange-700 transition-all active:scale-95"
        >
          ← Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-gray-700 hover:text-orange-500 transition-colors active:scale-95"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900">Order Summary</h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium">Review your party menu</p>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full">
            <span className="text-sm font-extrabold text-orange-500">{total}</span>
            <span className="text-xs text-orange-400 font-medium hidden sm:inline">dishes</span>
          </div>
        </div>
      </header>

      {/* ─── Empty State ─── */}
      {total === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6 text-center">
          <span className="text-6xl sm:text-7xl">🍽️</span>
          <p className="text-lg sm:text-xl font-bold text-gray-700">No dishes selected yet</p>
          <p className="text-sm text-gray-400">Go back and add some delicious dishes to your party!</p>
          <button
            onClick={() => navigate('/')}
            className="mt-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-orange-700 transition-all active:scale-95"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          {/* ─── Stats Bar ─── */}
          <div className="bg-white border-b border-gray-100">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {categoryOrder.map((cat) => (
                  <div key={cat}
                    className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border transition-all
                      ${grouped[cat]
                        ? 'bg-orange-50 border-orange-200'
                        : 'bg-gray-50 border-gray-100 opacity-40'}`}>
                    <span className="text-xl sm:text-2xl">{categoryEmojis[cat]}</span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center leading-tight">{cat}</span>
                    <span className={`text-base sm:text-lg font-extrabold ${grouped[cat] ? 'text-orange-500' : 'text-gray-400'}`}>
                      {grouped[cat]?.length ?? 0}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Dish List ─── */}
          <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 pb-32 space-y-6">
            {sortedGroups.map((cat) => (
              <section key={cat}>
                {/* Category header */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{categoryEmojis[cat]}</span>
                  <h2 className="text-base sm:text-lg font-extrabold text-gray-800">{cat}</h2>
                  <span className="ml-auto text-xs sm:text-sm font-bold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                    {grouped[cat].length} {grouped[cat].length === 1 ? 'dish' : 'dishes'}
                  </span>
                </div>

                {/* Dish cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {grouped[cat].map((dish) => (
                    <div
                      key={dish.id}
                      id={`summary-dish-${dish.id}`}
                      className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={imgErrors[dish.id]
                            ? `https://placehold.co/320x180/FF8C00/ffffff?text=${encodeURIComponent(dish.name)}`
                            : dish.image}
                          alt={dish.name}
                          onError={() => setImgErrors(prev => ({ ...prev, [dish.id]: true }))}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                        />
                        {/* Type badge */}
                        <div className={`absolute top-2 left-2 w-5 h-5 rounded border-2 bg-white flex items-center justify-center
                          ${dish.type === 'veg' ? 'border-green-600' : 'border-red-600'}`}>
                          <span className={`w-2.5 h-2.5 rounded-full ${dish.type === 'veg' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                        </div>
                        {/* Remove btn */}
                        <button
                          onClick={() => removeDish(dish.id)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm active:scale-90"
                          title="Remove dish"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>

                      {/* Info */}
                      <div className="p-3 sm:p-4">
                        <div className="flex items-start gap-2 mb-1.5">
                          <VegBadge type={dish.type} />
                          <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight line-clamp-1">{dish.name}</h3>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed mb-2">
                          {dish.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-orange-400 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                            {dish.subCategory}
                          </span>
                          <button
                            onClick={() => navigate(`/ingredients/${dish.id}`)}
                            className="ml-auto text-xs font-semibold text-orange-500 hover:underline"
                          >
                            View ingredients →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </main>

          {/* ─── Sticky Bottom Bar ─── */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-footer">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-6">

              {/* Summary text */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="text-center sm:text-left">
                  <p className="text-xs text-gray-400 font-medium">Total Selected</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-none">{total}
                    <span className="text-sm font-semibold text-gray-400 ml-1">dishes</span>
                  </p>
                </div>
                <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>
                <div className="flex gap-2 flex-wrap">
                  {sortedGroups.map(cat => (
                    <span key={cat} className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {categoryEmojis[cat]} {grouped[cat].length}
                    </span>
                  ))}
                </div>
              </div>

              {/* Confirm button */}
              <button
                id="confirm-order-btn"
                onClick={() => setConfirmed(true)}
                className="w-full sm:w-auto sm:ml-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold text-sm sm:text-base shadow-tab hover:bg-orange-700 active:scale-95 transition-all duration-200"
              >
                <span>🎉</span> Confirm Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderSummaryPage;
