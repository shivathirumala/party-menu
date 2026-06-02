import { useNavigate } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';

const FooterSummary = () => {
  const navigate = useNavigate();
  const { getTotalCount } = useMenu();
  const total = getTotalCount();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-footer">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">

        {/* Count */}
        <div className="flex items-center gap-3">
          <span className="text-sm sm:text-base font-semibold text-gray-600">Total Dish Selected</span>
          <span className="text-xl sm:text-2xl font-extrabold text-gray-900 min-w-[32px] text-center tabular-nums">
            {total}
          </span>
        </div>

        {/* Continue button */}
        <button
          id="continue-btn"
          disabled={total === 0}
          onClick={() => total > 0 && navigate('/summary')}
          className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold transition-all duration-200
            ${total > 0
              ? 'bg-gray-900 text-white hover:bg-gray-700 active:scale-95 shadow-lg hover:shadow-xl cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          Continue
          {total > 0 && (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default FooterSummary;
