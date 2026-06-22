import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Inicio', path: '/home' },
    { name: 'Productos', path: '/products' },
    { name: 'Categorias', path: '/categories' },
    { name: 'Tiendas', path: '/stores'},
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <>
    {/* Overlay for mobile when open */}
    <div className={`${isOpen ? 'fixed inset-0 z-30 bg-black/40 md:hidden' : 'hidden'}`} onClick={() => onClose && onClose()} />
    <aside className={`fixed z-40 left-0 top-0 h-screen w-56 bg-[#141414] p-6 flex-col h-screen md:static md:top-auto md:h-[calc(100vh-3rem)] md:translate-x-0 justify-between transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0 md:translate-x-0' : 'md:translate-x-0 -translate-x-full md:-translate-x-0'} md:flex`}> 

      {/* Navegación */}
      <div className="flex-1 overflow-y-auto pb-4">
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigate(item.path)}
            className={`px-4 py-2 rounded text-left transition ${
              location.pathname === item.path 
                ? 'pl-4 border-l-4 border-[#ec0000] text-[#e0e0e0] bg-[#1b1b1b] font-medium' 
                : 'text-[#a0a0a0] hover:text-[#e0e0e0] hover:bg-[#1b1b1b]'
            }`}
          >
            {item.name}
          </button>
        ))}
      </nav>
      </div>

      {/* Perfil abajo */}
      <div className="pt-4 flex-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1f1f1f] flex items-center justify-center text-[#e0e0e0]">U</div>
          <div>
            <div className="text-sm text-[#e0e0e0] font-medium">Usuario</div>
            <button onClick={() => handleNavigate('/profile')} className="text-xs text-[#a0a0a0] hover:text-[#e0e0e0]">Perfil</button>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;