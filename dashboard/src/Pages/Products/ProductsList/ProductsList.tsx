import { useState } from 'react';
import ProductItem from '../../../Componets/molecules/ProductItem';

const ProductsList = () => {
const [products] = useState([
    { id: 1, name: 'Producto A', imageUrl: '' },
    { id: 2, name: 'Producto B', imageUrl: '' },
  ]);

  return (
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
  );
};

export default ProductsList;