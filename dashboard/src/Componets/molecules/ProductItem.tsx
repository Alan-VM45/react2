// Definimos el contrato de datos (la interface)
interface ProductItemProps {
    name: string;
    id: string | number;
    imageUrl?: string; // Opcional, por si el producto no tiene imagen todavía
}

const ProductItem = ({ name, id, imageUrl }: ProductItemProps) => {
return (
        <div className="flex items-center justify-between p-3 bg-[#242424] rounded-lg border border-[#2a2a2a] hover:border-[#333333] shadow-sm transition-all cursor-pointer">
        <div className="flex items-center gap-4">
            {/* Contenedor de la imagen */}
        <div className="w-10 h-10 rounded overflow-hidden bg-gray-700 flex items-center justify-center">
            {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">Sin img</div>
            )}
        </div>
        
        {/* Info del producto */}
                <div className="flex flex-col">
                    <h4 className="text-[#e0e0e0] font-medium">{name}</h4>
                    <span className="text-[#a0a0a0] text-sm">ID: {id}</span>
        </div>
    </div>

        {/* Indicador visual */}
            <span className="text-[#a0a0a0] text-lg font-bold">›</span>
    </div>
    );
};

export default ProductItem;