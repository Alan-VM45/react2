import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsApi, type Product } from '../../../services/productsApi';

const ProductsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await productsApi.getProductById(id ?? '');
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <p className="text-sm text-[#a0a0a0]">Cargando producto...</p>;
  }

  if (error || !product) {
    return <p className="text-sm text-red-400">{error ?? 'Producto no encontrado'}</p>;
  }

  return (
    <div className="space-y-6 rounded-lg border border-[#2a2a2a] bg-[#242424] p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#e0e0e0]">{product.title}</h2>
          <p className="text-sm text-[#a0a0a0]">{product.category}</p>
        </div>
        <button onClick={() => navigate('/products')} className="rounded border border-[#333333] px-3 py-2 text-sm text-[#e0e0e0]">
          Volver
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <div className="flex h-52 items-center justify-center overflow-hidden rounded bg-[#1f1f1f] text-[#a0a0a0]">
          {product.image ? <img src={product.image} alt={product.title} className="h-full w-full object-cover" /> : 'Sin imagen'}
        </div>
        <div className="space-y-3 text-[#e0e0e0]">
          <p className="text-sm text-[#a0a0a0]">{product.description}</p>
          <p><span className="font-semibold">Precio:</span> $ {product.price}</p>
          <p><span className="font-semibold">Stock:</span> {product.stock}</p>
          <p><span className="font-semibold">Destacado:</span> {product.top ? 'Sí' : 'No'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
