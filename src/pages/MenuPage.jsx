import { useMemo } from 'react';
import { useMenu } from '../context/MenuContext';
import menuData from '../data/menuData.json';
import SearchBar from '../components/SearchBar';
import CategoryTabs from '../components/CategoryTabs';
import FilterToggle from '../components/FilterToggle';
import DishCard from '../components/DishCard';
import FooterSummary from '../components/FooterSummary';

const MenuPage = () => {
  const { activeCategory, searchQuery, vegFilter, nonVegFilter } = useMenu();

  const filteredDishes = useMemo(() => {
    let dishes = menuData.dishes.filter((d) => d.category === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      dishes = dishes.filter((d) => d.name.toLowerCase().includes(q));
    }

    if (vegFilter || nonVegFilter) {
      dishes = dishes.filter((d) => {
        if (vegFilter && nonVegFilter) return true;
        if (vegFilter) return d.type === 'veg';
        if (nonVegFilter) return d.type === 'nonveg';
        return true;
      });
    }

    return dishes;
  }, [activeCategory, searchQuery, vegFilter, nonVegFilter]);

  const grouped = useMemo(() => {
    return filteredDishes.reduce((acc, dish) => {
      const key = dish.subCategory || 'Other';
      if (!acc[key]) acc[key] = [];
      acc[key].push(dish);
      return acc;
    }, {});
  }, [filteredDishes]);

  return (
    <div className="min-h-screen bg-surface flex flex-col">

      {/* ─── Sticky Header ─── */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        {/* Title bar */}
        <div className="px-3 sm:px-4 md:px-6 pt-4 sm:pt-5 pb-1 flex items-center justify-between max-w-screen-xl mx-auto w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Menu</h1>
          <span className="text-2xl">🎉</span>
        </div>

        <div className="max-w-screen-xl mx-auto w-full">
          <SearchBar />
          <div className="pt-2 pb-1">
            <CategoryTabs />
          </div>
          <FilterToggle />
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="flex-1 pb-24 max-w-screen-xl mx-auto w-full">
        {filteredDishes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center px-6">
            <span className="text-6xl sm:text-7xl animate-bounce-slow">🍽️</span>
            <p className="text-lg sm:text-xl font-bold text-gray-700">No dishes found</p>
            <span className="text-sm sm:text-base text-gray-400">Try adjusting your search or filters</span>
          </div>
        ) : (
          Object.entries(grouped).map(([subCat, dishes]) => (
            <section key={subCat}>
              {/* Sub-category header */}
              <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 bg-gray-50 border-y border-gray-100 sticky top-0">
                <h2 className="text-sm sm:text-base font-bold text-gray-800">{subCat}</h2>
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </div>

              {/* On tablet/desktop: show 2-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                {dishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      <FooterSummary />
    </div>
  );
};

export default MenuPage;
