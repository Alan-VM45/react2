// src/components/organisms/Layout.tsx
import { useLocation } from 'react-router-dom';
import Sidebar from './SideBar';
import SearchBar from '../molecules/SearchBar';
import Button from '../atoms/Button';
import { useState } from 'react';

interface LayoutProps {
    children: React.ReactNode;
    pageTitle: string;
}

const Layout = ({ children, pageTitle }: LayoutProps) => {
    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const isProductsPage = location.pathname === '/products';
    const isStoresPage = location.pathname === '/stores';
    const isCategoriesPage = location.pathname === '/categories';
    const sectionTitle = isProductsPage ? 'Productos' : isStoresPage ? 'Tiendas' : isCategoriesPage ? 'Categorias' : '';
    const actionLabel = isProductsPage ? 'Agregar Producto' : isStoresPage ? 'Agregar Tienda' : isCategoriesPage ? 'Agregar Categoría' : '';

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-[#e0e0e0] flex flex-col">
            {/* Top Header (dark) */}
            <header className="bg-[#181818] text-[#e0e0e0] p-3 shadow-sm sticky top-0 z-40">
                <div className="w-full flex items-center">
                    {/* Left: Dashboard + hamburger */}
                    <div className="flex items-center gap-4 pl-4 md:pl-6">
                        <button className="md:hidden text-white" onClick={() => setMenuOpen(true)} aria-label="Abrir menú">☰</button>
                        <div className="text-white font-bold text-lg">Dashboard</div>
                    </div>

                    {/* Center: aligned container matching main area */}
                    <div className="flex-1">
                        <div className="max-w-6xl w-full mx-auto flex items-center justify-between px-4">
                            <div className="flex-1">
                                {sectionTitle && (
                                    <h2 className="text-xl font-semibold text-[#e0e0e0]">{sectionTitle}</h2>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                {sectionTitle && (
                                    <div className="hidden sm:block w-72">
                                        <SearchBar placeholder={isProductsPage ? 'Buscar productos' : isStoresPage ? 'Buscar tienda...' : 'Buscar...'} onSearch={(v) => console.log('buscar', v)} />
                                    </div>
                                )}
                                {sectionTitle && actionLabel && (
                                    <Button label={actionLabel} variant="secondary" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1">
                <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
                <main className="flex-1 p-6 overflow-auto">
                    <div className="max-w-6xl w-full mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;