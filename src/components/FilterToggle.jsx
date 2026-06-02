import { useMenu } from '../context/MenuContext';

const FilterToggle = () => {
  const { activeCategory, vegFilter, setVegFilter, nonVegFilter, setNonVegFilter, getCategoryCount } = useMenu();
  const selectedCount = getCategoryCount(activeCategory);

  return (
    <div className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 border-b border-gray-100 bg-white">
      <div className="flex items-center gap-2">
        <span className="text-sm sm:text-base font-bold text-gray-800 flex-1 truncate">
          {activeCategory}s Selected
        </span>
        <span className="text-sm font-semibold text-gray-400">({selectedCount})</span>

        <div className="flex items-center gap-2">
          {/* Veg toggle */}
          <button
            id="veg-filter-btn"
            onClick={() => setVegFilter(v => !v)}
            title="Vegetarian"
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 transition-all duration-200
              ${vegFilter
                ? 'bg-green-50 border-green-600 shadow-[0_0_0_3px_rgba(22,163,74,0.15)]'
                : 'bg-gray-50 border-gray-200 hover:border-green-400 hover:scale-110'}`}
          >
            <span className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 flex items-center justify-center
              ${vegFilter ? 'border-green-600' : 'border-green-500'}`}>
              <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${vegFilter ? 'bg-green-600' : 'bg-green-500'}`}></span>
            </span>
          </button>

          {/* Non-veg toggle */}
          <button
            id="nonveg-filter-btn"
            onClick={() => setNonVegFilter(v => !v)}
            title="Non-Vegetarian"
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 transition-all duration-200
              ${nonVegFilter
                ? 'bg-red-50 border-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.15)]'
                : 'bg-gray-50 border-gray-200 hover:border-red-400 hover:scale-110'}`}
          >
            <span className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded border-2 flex items-center justify-center
              ${nonVegFilter ? 'border-red-600' : 'border-red-500'}`}>
              <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${nonVegFilter ? 'bg-red-600' : 'bg-red-500'}`}></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterToggle;
