interface StatCardProps {
    title: string;
    count: number;
    onView: () => void;
    onAdd?: () => void;
}

const StatCard = ({ title, count, onView, onAdd }: StatCardProps) => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-between border border-gray-700">
        <div className="flex items-center gap-4">
            <span className="text-white font-semibold text-lg">{count} {title}</span>
        </div>
        <div className="flex gap-2">
            <button onClick={onView} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition">
            Ver Listado
            </button>
            <button onClick={onAdd} className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">
            Agregar {title.slice(0, -1)}
            </button>
        </div>
        </div>
    );
};

export default StatCard;