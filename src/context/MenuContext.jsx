import { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Main Course');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegFilter, setVegFilter] = useState(false);
  const [nonVegFilter, setNonVegFilter] = useState(false);

  const addDish = (dish) => {
    setSelectedDishes((prev) => {
      if (prev.find((d) => d.id === dish.id)) return prev;
      return [...prev, dish];
    });
  };

  const removeDish = (dishId) => {
    setSelectedDishes((prev) => prev.filter((d) => d.id !== dishId));
  };

  const isDishSelected = (dishId) => {
    return selectedDishes.some((d) => d.id === dishId);
  };

  const getCategoryCount = (category) => {
    return selectedDishes.filter((d) => d.category === category).length;
  };

  const getTotalCount = () => {
    return selectedDishes.length;
  };

  return (
    <MenuContext.Provider
      value={{
        selectedDishes,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        vegFilter,
        setVegFilter,
        nonVegFilter,
        setNonVegFilter,
        addDish,
        removeDish,
        isDishSelected,
        getCategoryCount,
        getTotalCount,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) throw new Error('useMenu must be used within a MenuProvider');
  return context;
};
