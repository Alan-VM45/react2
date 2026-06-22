import StatCard from "../../Componets/molecules/StatCard";
import { useNavigate } from 'react-router-dom';

function HomeMain() {
    const navigate = useNavigate(); 
    return (
        <div className="flex flex-col gap-6">
            <div className="w-full">
                <StatCard 
                    title="Productos" 
                    count={123} 
                    onView={() => navigate('/products')} 
                    onAdd={() => console.log('Agregar producto')} 
                />
            </div>
            <div className="w-full">
                <StatCard
                    title="Tiendas" 
                    count={10} 
                    onView={() => navigate('/stores')} 
                    onAdd={() => console.log('Agregar Tienda')}
                />
            </div>
        </div>
    );
}

export default HomeMain;
