// src/components/organisms/Layout.tsx
import Sidebar from './SideBar';

interface LayoutProps {
    children: React.ReactNode;
    pageTitle: string; // Recibimos el título desde la página
}

const Layout = ({ children, pageTitle }: LayoutProps) => {
return (
    // min-h-screen asegura que ocupe todo el alto, flex hace la fila horizontal
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar /> {/* El Sidebar vive SOLO aquí */}
    
        <main className="flex-1 p-8"> {/* flex-1 hace que ocupe el resto del espacio */}
            <h1 className="text-3xl font-bold mb-8">{pageTitle}</h1>
            {children} {/* Aquí se inyecta tu Home o ProductsList */}
        </main>
    </div>
);
};

export default Layout;