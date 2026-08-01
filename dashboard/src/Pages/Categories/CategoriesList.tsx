import { useEffect, useState } from 'react';
import { productsApi, type CategoryOption } from '../../services/productsApi';

const CategoriesList = () => {
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      const data = await productsApi.getCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudieron cargar las categorías');
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async () => {
    if (!newCategory.trim()) {
      setError('Ingresa el nombre de la categoría');
      return;
    }

    try {
      await productsApi.createCategory({ name: newCategory.trim() });
      setNewCategory('');
      setSuccess('Categoría creada correctamente');
      setError(null);
      loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear la categoría');
      setSuccess(null);
    }
  };

  const handleUpdate = async (id: number) => {
    if (!editingName.trim()) {
      setError('Ingresa el nombre de la categoría');
      return;
    }

    try {
      await productsApi.updateCategory(id, { name: editingName.trim() });
      setEditingId(null);
      setEditingName('');
      setSuccess('Categoría actualizada correctamente');
      setError(null);
      loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo actualizar la categoría');
      setSuccess(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Eliminar esta categoría? Se quitará de los productos asociados.')) {
      return;
    }

    try {
      await productsApi.deleteCategory(id);
      setSuccess('Categoría eliminada correctamente');
      setError(null);
      loadCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo eliminar la categoría');
      setSuccess(null);
    }
  };

  return (
    <div className="space-y-6 rounded-lg border border-[#2a2a2a] bg-[#242424] p-5">
      <div>
        <h2 className="text-xl font-semibold text-[#e0e0e0]">Categorías</h2>
        <p className="text-sm text-[#a0a0a0] mt-1">Administra las categorías disponibles para tus productos.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_280px]">
        <div>
          <label className="block text-sm text-[#a0a0a0]">Nueva categoría</label>
          <div className="mt-2 flex gap-2">
            <input
              value={newCategory}
              onChange={(event) => setNewCategory(event.target.value)}
              placeholder="Nombre de categoría"
              className="w-full rounded border border-[#333333] bg-[#1f1f1f] px-3 py-2 text-sm text-[#e0e0e0]"
            />
            <button
              type="button"
              onClick={handleCreate}
              className="rounded bg-[#ec0000] px-4 py-2 text-sm font-medium text-white"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {success && <p className="text-sm text-green-400">{success}</p>}

      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.id ?? category.name}
            className="flex flex-col gap-3 rounded-lg border border-[#2a2a2a] bg-[#1f1f1f] p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {editingId === category.id ? (
                <input
                  value={editingName}
                  onChange={(event) => setEditingName(event.target.value)}
                  className="w-full rounded border border-[#333333] bg-[#242424] px-3 py-2 text-sm text-[#e0e0e0]"
                />
              ) : (
                <div>
                  <p className="text-base font-medium text-[#e0e0e0]">{category.name}</p>
                  <p className="text-xs text-[#a0a0a0]">ID: {category.id ?? 'N/A'}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {editingId === category.id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleUpdate(category.id ?? 0)}
                      className="rounded bg-[#0f766e] px-3 py-2 text-sm text-white hover:bg-[#115e59]"
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setEditingName('');
                      }}
                      className="rounded border border-[#333333] px-3 py-2 text-sm text-[#e0e0e0]"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(category.id ?? null);
                        setEditingName(category.name);
                      }}
                      className="rounded border border-[#333333] px-3 py-2 text-sm text-[#e0e0e0] hover:bg-[#2a2a2a]"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => category.id && handleDelete(category.id)}
                      className="rounded bg-[#ec0000] px-3 py-2 text-sm text-white hover:bg-[#c70000]"
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
