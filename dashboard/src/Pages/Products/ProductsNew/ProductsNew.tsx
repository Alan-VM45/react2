import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsApi, type CategoryOption } from '../../../services/productsApi';

const ProductsNew = () => {
  const navigate = useNavigate();
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
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await productsApi.getCategories();
        setCategories(data);
      } catch {
        setError('No se pudieron cargar las categorías');
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await productsApi.createProduct(form);
      setSuccess('Producto creado correctamente');
      setTimeout(() => navigate('/products'), 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear el producto');
    }
  };

  return (
    <div className="rounded-lg border border-[#2a2a2a] bg-[#242424] p-5">
      <h2 className="mb-4 text-xl font-semibold text-[#e0e0e0]">Nuevo producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          placeholder="Título"
          className="w-full rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
          required
        />
        <input
          value={form.image}
          onChange={(event) => setForm({ ...form, image: event.target.value })}
          placeholder="URL de imagen"
          className="w-full rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
        />
        <textarea
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          placeholder="Descripción"
          className="w-full rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
          rows={4}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            value={form.price}
            onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
            placeholder="Precio"
            className="w-full rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
            required
          />
          <input
            type="number"
            value={form.stock}
            onChange={(event) => setForm({ ...form, stock: Number(event.target.value) })}
            placeholder="Stock"
            className="w-full rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
            required
          />
        </div>
        <select
          value={form.category}
          onChange={(event) => setForm({ ...form, category: event.target.value })}
          className="w-full rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
          required
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-[#e0e0e0]">
          <input type="checkbox" checked={form.top} onChange={() => setForm({ ...form, top: !form.top })} />
          Producto destacado
        </label>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {success && <p className="text-sm text-green-400">{success}</p>}
        <button type="submit" className="rounded bg-[#ec0000] px-4 py-2 text-sm font-medium text-white">
          Guardar producto
        </button>
      </form>
    </div>
  );
};

export default ProductsNew;
