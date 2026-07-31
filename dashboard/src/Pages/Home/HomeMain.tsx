import StatCard from "../../Componets/molecules/StatCard";
import { useNavigate } from 'react-router-dom';

function HomeMain() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">

            <div className="grid gap-4 lg:grid-cols-2">
                <StatCard
                    title="Productos"
                    count={123}
                    onView={() => navigate('/products')}
                    onAdd={() => navigate('/products')}
                />
                <StatCard
                    title="Categorías"
                    count={8}
                    onView={() => navigate('/categories')}
                    onAdd={() => navigate('/categories')}
                />
                <StatCard
                    title="Tiendas"
                    count={10}
                    onView={() => navigate('/stores')}
                    onAdd={() => navigate('/stores')}
                />
            </div>
        </div>
    );
}

export default HomeMain;
