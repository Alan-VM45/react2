import { useState } from 'react';
import Layout from '../../../Componets/organisms/Layaout';
import ProductItem from '../../../Componets/molecules/ProductItem';
import SearchBar from '../../../Componets/molecules/SearchBar';

const ProductsList = () => {
  // Simulamos datos de productos (aquí después iría tu fetch a la API)
const [products] = useState([
    { id: 1, name: 'Producto A', imageUrl: '' },
    { id: 2, name: 'Producto B', imageUrl: '' },
]);

return (
    <Layout pageTitle="Productos">
    <div className="flex flex-col gap-6">
        {/* Buscador */}
        <SearchBar 
            placeholder="Buscar producto..." 
            onSearch={(val) => console.log('Buscando:', val)} 
        />

        {/* Lista de productos */}
        <div className="flex flex-col gap-3">
            {products.map((product) => (
                <ProductItem 
                    key={product.id} 
                    name={product.name} 
                    id={product.id} 
                    imageUrl={product.imageUrl} 
            />
            ))}
        </div>
    </div>
    </Layout>
);
};

export default ProductsList;