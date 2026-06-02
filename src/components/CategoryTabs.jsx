import { useMenu } from '../context/MenuContext';
import menuData from '../data/menuData.json';

const CategoryTabs = () => {
  const { activeCategory, setActiveCategory, getCategoryCount, setSearchQuery } = useMenu();

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setSearchQuery('');
  };

  return (
    <div className="px-3 sm:px-4 md:px-6 pt-3 overflow-x-auto hide-scrollbar">
      <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
        {menuData.categories.map((cat) => {
          const count = getCategoryCount(cat);
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              id={`category-tab-${cat.toLowerCase().replace(' ', '-')}`}
              onClick={() => handleCategoryClick(cat)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200
                ${isActive
                  ? 'bg-primary text-white shadow-tab scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300 border border-transparent'
                }`}
            >
              <span>{cat}</span>
              <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold
                ${isActive ? 'bg-white/25 text-white' : 'bg-black/10 text-current'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
