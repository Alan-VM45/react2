import { useState } from 'react';
import ProductItem from '../../../Componets/molecules/ProductItem';
import Button from '../../../Componets/atoms/Button';
import SearchBar from '../../../Componets/molecules/SearchBar';

const ProductsList = () => {
  // Simulamos datos de productos (aquí después iría tu fetch a la API)
const [products] = useState([
    { id: 1, name: 'Producto A', imageUrl: '' },
    { id: 2, name: 'Producto B', imageUrl: '' },
]);

return (
    <div className="flex flex-col gap-4 px-4 py2" >
        {/* Buscador */}
        <SearchBar 
            placeholder="Buscar producto..." 
            onSearch={(val) => console.log('Buscando:', val)} 
        />
        <Button
            label="Agregar Productos" 
            variant="secondary" 
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
);
};

export default ProductsList;