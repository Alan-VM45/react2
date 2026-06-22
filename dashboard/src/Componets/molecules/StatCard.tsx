interface StatCardProps {
    title: string;
    count: number;
    onView: () => void;
    onAdd?: () => void;
}

const StatCard = ({ title, count, onView, onAdd }: StatCardProps) => {
    return (
        // Reducido p-4 a p-3 para achicar la tarjeta
        <div className="bg-[#242424] p-3 rounded-lg flex items-center justify-between border border-[#2a2a2a] shadow-sm transition">
            <div className="flex items-center gap-3">
                {/* Reducido w-28 h-28 a w-16 h-16 */}
                <div className=" rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    {/* Reducido tamaño de fuente a text-xl */}
                    <span className="text-xl font-extrabold text-[#e0e0e0]">{count}</span>
                </div>
                <div>
                    <span className="text-[#a0a0a0] text-xs">Total</span>
                    <p className="text-[#e0e0e0] font-semibold text-base">{title}</p>
                </div>
            </div>
            <div className="flex gap-2">
                {/* Ajustado padding de botones a px-2 py-1 y texto más pequeño */}
                <button onClick={onView} className="px-2 py-1 bg-[#1f1f1f] text-[#e0e0e0] rounded hover:bg-[#292929] transition text-xs">
                    Ver Listado
                </button>
                <button onClick={onAdd} className="px-2 py-1 bg-[#ec0000] text-[#e0e0e0] rounded hover:bg-[#c70000] transition text-xs">
                    Agregar {title.slice(0, -1)}
                </button>
            </div>
        </div>
    );
};
export default StatCard;