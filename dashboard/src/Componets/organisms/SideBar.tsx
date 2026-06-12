import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
const navigate = useNavigate();
const location = useLocation();

const menuItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Productos', path: '/products' },
    { name: 'Tiendas', path: '/stores' },
];

return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
    {/* Logo */}
    <div className="text-red-600 font-bold text-2xl mb-10">
        Santander
    </div>

    {/* Navegación */}
    <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
            <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-3 rounded-lg text-left transition ${
                location.pathname === item.path 
                    ? 'bg-gray-800 text-white font-medium' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
            >
                {item.name}
            </button>
            ))}
    </nav>
    </aside>
    );
};

export default Sidebar;