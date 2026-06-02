import { useMenu } from '../context/MenuContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useMenu();

  return (
    <div className="px-3 sm:px-4 md:px-6 pt-3">
      <div className={`flex items-center gap-2 sm:gap-3 bg-gray-100 border-2 rounded-full px-3 sm:px-4 py-2.5 transition-all duration-200
        ${searchQuery ? 'border-orange-400 bg-white shadow-[0_0_0_3px_rgba(255,140,0,0.15)]' : 'border-transparent focus-within:border-orange-400 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(255,140,0,0.12)]'}`}>

        {/* Search Icon */}
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          id="dish-search-input"
          type="text"
          placeholder="Search dish for your party......"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-0 bg-transparent text-sm sm:text-base text-gray-800 placeholder-gray-400 outline-none font-medium"
        />

        {searchQuery && (
          <button onClick={() => setSearchQuery('')}
            className="flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-all">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}

        {/* Mic */}
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 cursor-pointer hover:text-orange-500 transition-colors" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
