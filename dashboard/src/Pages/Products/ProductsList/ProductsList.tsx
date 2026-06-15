import { useState } from 'react';
import ProductItem from '../../../Componets/molecules/ProductItem';
import Button from '../../../Componets/atoms/Button';
import SearchBar from '../../../Componets/molecules/SearchBar';

const ProductsList = () => {
const [products] = useState([
    { id: 1, name: 'Producto A', imageUrl: '' },
    { id: 2, name: 'Producto B', imageUrl: '' },
  ]);

  return (
    // Contenedor principal en columna
    <div className="flex flex-col gap-6 p-4"> 
        
        {/* Nivel Header: Fila para buscador y botón */}
        <div className="flex flex-row items-center gap-4">
            <div className='flex-1 max-w-sm'>
                <SearchBar 
                    placeholder="Buscar producto..." 
                    onSearch={(val) => console.log('Buscando:', val)} 
                />
            </div>
            <Button
                label="Agregar Productos" 
                variant="secondary" 
            />
        </div>

        {/* Nivel Contenido: Lista que ahora sí se posiciona abajo por el flex-col superior */}
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