import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsApi, type CategoryOption, type Product } from '../../../services/productsApi';

const ProductsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [form, setForm] = useState({
    title: '',
    image: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    top: false,
    suggestions: [] as number[],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productData, categoryData] = await Promise.all([
          productsApi.getProductById(id ?? ''),
          productsApi.getCategories(),
        ]);

        setProduct(productData);
        setForm({
          title: productData.title,
          image: productData.image || '',
          description: productData.description || '',
          price: productData.price,
          category: productData.category,
          stock: productData.stock,
          top: productData.top,
          suggestions: productData.suggestions || [],
        });
        setCategories(categoryData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!id) {
      setError('ID de producto inválido.');
      return;
    }

    try {
      await productsApi.updateProduct(id, form);
      setSuccess('Producto actualizado correctamente');
      setTimeout(() => navigate(`/products/${id}`), 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo actualizar el producto');
    }
  };

  if (loading) {
    return <p className="text-sm text-[#a0a0a0]">Cargando producto...</p>;
  }

  if (error || !product) {
    return <p className="text-sm text-red-400">{error ?? 'Producto no encontrado'}</p>;
  }

  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#242424] p-5">
      <h2 className="mb-4 text-xl font-semibold text-[#e0e0e0]">Editar producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm text-[#a0a0a0]">Título</label>
        <input
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          placeholder="Título del producto"
          className="w-full rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
          required
        />
        <label className="block text-sm text-[#a0a0a0]">URL de imagen</label>
        <input
          value={form.image}
          onChange={(event) => setForm({ ...form, image: event.target.value })}
          placeholder="https://..."
          className="w-full rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
        />
        <label className="block text-sm text-[#a0a0a0]">Descripción</label>
        <textarea
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          placeholder="Descripción del producto"
          className="w-full rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
          rows={4}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm text-[#a0a0a0]">
            Precio
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
              placeholder="Precio"
              className="mt-1 w-full rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
              required
            />
          </label>
          <label className="block text-sm text-[#a0a0a0]">
            Stock
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(event) => setForm({ ...form, stock: Number(event.target.value) })}
              placeholder="Cantidad disponible"
              className="mt-1 w-full rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
              required
            />
          </label>
        </div>
        <label className="block text-sm text-[#a0a0a0]">
          Categoría
          <input
            list="category-options"
            value={form.category}
            onChange={(event) => setForm({ ...form, category: event.target.value })}
            placeholder="Escribe o selecciona una categoría"
            className="mt-1 w-full rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
            required
          />
          <datalist id="category-options">
            {categories.map((category) => (
              <option key={category.id ?? category.name} value={category.name} />
            ))}
          </datalist>
        </label>
        <label className="flex items-center gap-2 text-sm text-[#e0e0e0]">
          <input type="checkbox" checked={form.top} onChange={() => setForm({ ...form, top: !form.top })} />
          Producto destacado
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {success && <p className="text-sm text-green-400">{success}</p>}
        <div className="flex flex-wrap gap-2">
          <button type="submit" className="rounded bg-[#ec0000] px-4 py-2 text-sm font-medium text-white">
            Guardar cambios
          </button>
          <button
            type="button"
            onClick={() => navigate(`/products/${id}`)}
            className="rounded border border-[#333333] px-4 py-2 text-sm text-[#e0e0e0]"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductsEdit;
