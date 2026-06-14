import { useState } from 'react';
import ProductItem from '../../../Componets/molecules/ProductItem';
import Button from '../../../Componets/atoms/Button';
import SearchBar from '../../../Componets/molecules/SearchBar';

const ProductsList = () => {
  // Simulamos datos de productos (aquí después iría tu fetch a la API)
const [products] = useState([
    { id: 1, name: 'Producto A', imageUrl: '' },
    { id: 2, name: 'Producto B', imageUrl: '' },
    { id: 3, name: 'Producto C', imageUrl: '' },
    { id: 4, name: 'Producto D', imageUrl: '' },
    { id: 5, name: 'Producto E', imageUrl: '' },
    { id: 6, name: 'Producto F', imageUrl: '' },
    { id: 7, name: 'Producto G', imageUrl: '' },
    { id: 8, name: 'Producto H', imageUrl: '' },
    { id: 9, name: 'Producto I', imageUrl: '' },
    { id: 10, name: 'Producto J', imageUrl: '' }
]);

return (
    <div className="flex flex-col gap-4 px-4 py2" >
        {/* Buscador */}
        <SearchBar 
            placeholder="Buscar producto..." 
            onSearch={(val) => console.log('Buscando:', val)} 
        />
        <div className="flex gap-4 mt-4">
        <Button
            label="Agregar Productos" 
            variant="secondary" 
        />
        </div>

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