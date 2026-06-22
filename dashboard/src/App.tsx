import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Componets/organisms/Layaout';
import HomeMain from './Pages/Home/HomeMain';
import ProductsList from './Pages/Products/ProductsList/ProductsList';
import StoresList from './Pages/Stores/StoresList';
import Profile from './Pages/Profile/Profile';
import CategoriesList from './Pages/Categories/CategoriesList';

function App() {

  return (
    <BrowserRouter>
      {/* El Layout contiene el Sidebar y el MainArea. 
        Las rutas definen qué componente va dentro del MainArea.
      */}
      <Layout pageTitle="Mi tienda">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomeMain />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/stores" element={<StoresList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<CategoriesList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;