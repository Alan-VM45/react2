import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsApi, type Product } from '../../../services/productsApi';

const ProductsList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          productsApi.getProducts({ search, category }),
          productsApi.getCategories(),
        ]);
        setProducts(Array.isArray(productsData) ? productsData : []);
        setCategories(Array.isArray(categoriesData) ? categoriesData.map((item) => item.name) : []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [search, category]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar producto"
          className="flex-1 rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
        >
          <option value="">Todas</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button
          onClick={() => navigate('/products/new')}
          className="rounded bg-[#ec0000] px-4 py-2 text-sm font-medium text-white"
        >
          Nuevo producto
        </button>
      </div>

      {loading && <p className="text-sm text-[#a0a0a0]">Cargando productos...</p>}
      {error && <p className="text-sm text-red-400">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-sm text-[#a0a0a0]">No hay productos para mostrar.</p>
      )}

      <div className="grid gap-3">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
            className="flex items-center justify-between rounded-lg border border-[#2a2a2a] bg-[#242424] p-3 text-left hover:border-[#ec0000]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded bg-[#1f1f1f] text-xs text-[#a0a0a0]">
                {product.image ? <img src={product.image} alt={product.title} className="h-full w-full object-cover" /> : 'Sin img'}
              </div>
              <div>
                <p className="font-medium text-[#e0e0e0]">{product.title}</p>
                <p className="text-sm text-[#a0a0a0]">{product.category} · $ {product.price}</p>
              </div>
            </div>
            <span className="text-[#a0a0a0]">›</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;