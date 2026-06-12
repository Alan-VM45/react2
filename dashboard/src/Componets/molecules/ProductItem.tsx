// Definimos el contrato de datos (la interface)
interface ProductItemProps {
    name: string;
    id: string | number;
  imageUrl?: string; // Opcional, por si el producto no tiene imagen todavía
}

const ProductItem = ({ name, id, imageUrl }: ProductItemProps) => {
return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-red-500 transition-all cursor-pointer">
        <div className="flex items-center gap-4">
            {/* Contenedor de la imagen */}
        <div className="w-12 h-12 rounded overflow-hidden bg-gray-700">
            {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">Sin img</div>
            )}
        </div>
        
        {/* Info del producto */}
        <div className="flex flex-col">
            <h4 className="text-white font-medium">{name}</h4>
            <span className="text-gray-400 text-sm">ID: {id}</span>
        </div>
    </div>

        {/* Indicador visual */}
        <span className="text-gray-500 text-xl font-bold">›</span>
    </div>
    );
};

export default ProductItem;