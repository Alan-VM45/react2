import { useState } from 'react';

interface Store {
    id: number;
    name: string;
    location: string;
}

const StoresList = () => {
const [stores] = useState<Store[]>([
        { id: 1, name: 'Tienda Centro', location: 'Centro' },
        { id: 2, name: 'Tienda Norte', location: 'Norte' },
        { id: 3, name: 'Tienda Sur', location: 'Sur' },
        { id: 4, name: 'Tienda Este', location: 'Este' }
]);

return (
    <div className="flex flex-col gap-3">
        {stores.map((store) => (
            <div
            key={store.id}
            className="flex items-center justify-between p-3 bg-[#242424] rounded-lg border border-[#2a2a2a] hover:border-[#333333] shadow-sm transition-all cursor-pointer"
            >
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded overflow-hidden bg-[#1f1f1f] flex items-center justify-center">
                    <div className="text-center text-[#a0a0a0]">
                        <div className="text-sm font-bold">{store.id}</div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h4 className="text-[#e0e0e0] font-medium">{store.name}</h4>
                    <span className="text-[#a0a0a0] text-sm">{store.location}</span>
                </div>
            </div>
                <span className="text-[#a0a0a0] text-lg font-bold">›</span>
            </div>
        ))}
    </div>
);
}

export default StoresList;
