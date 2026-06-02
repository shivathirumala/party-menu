import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MenuProvider } from './context/MenuContext';
import MenuPage from './pages/MenuPage';
import IngredientPage from './pages/IngredientPage';
import OrderSummaryPage from './pages/OrderSummaryPage';

function App() {
  return (
    <MenuProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="/summary" element={<OrderSummaryPage />} />
        </Routes>
      </BrowserRouter>
    </MenuProvider>
  );
}

export default App;
