import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Componets/organisms/Layaout';
import HomeMain from './Pages/Home/HomeMain';
import ProductsList from './Pages/Products/ProductsList/ProductsList';

function App() {
  return (
    <BrowserRouter>
      {/* El Layout contiene el Sidebar y el MainArea. 
        Las rutas definen qué componente va dentro del MainArea.
      */}
      <Layout pageTitle="Dashboard">
        <Routes>
          <Route path="/" element={<HomeMain />} />
          <Route path="/products" element={<ProductsList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;