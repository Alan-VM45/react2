interface MainAreaProps {
    children: React.ReactNode;
    title: string;
}

const MainArea = ({ children, title }: MainAreaProps) => {
return (
    <div className="flex-1 p-8 overflow-y-auto">
        {/* Header del Main Area */}
    <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
    </header>
      {/* Contenido dinámico (la página en sí) */}
    <main>
        {children}
    </main>
    </div>
);
};

export default MainArea;