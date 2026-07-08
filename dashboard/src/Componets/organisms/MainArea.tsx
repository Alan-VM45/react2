import type { ReactNode } from 'react';

interface MainAreaProps {
    children: ReactNode;
    title: string;
}

const MainArea = ({ children, title }: MainAreaProps) => {
    return (
        <div className="flex-1 overflow-y-auto">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-[#e0e0e0]">{title}</h1>
            </header>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
};

export default MainArea;