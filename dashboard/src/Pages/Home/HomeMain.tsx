import StatCard from "../../Componets/molecules/StatCard";
import Button from "../../Componets/atoms/Button";
import { useNavigate } from 'react-router-dom';

// Ya no necesitas el div con p-8 ni el h1 extra, 
// el Layout ya se encarga de eso.

function HomeMain() {
    const navigate = useNavigate(); 
    return (
        <div className="flex flex-col gap-4">
            <StatCard 
                title="Productos" 
                count={123} 
                onView={() => navigate('/products')} 
                onAdd={() => console.log('Agregar producto')} 
            />
            
            <StatCard
                title="Categoias" 
                count={13} 
                onView={() => navigate('/categories')} 
                onAdd={() => console.log('Agregar Categoria')}
            />
            
            <StatCard
                title="Usuarios" 
                count={13} 
                onView={() => navigate('/users')} 
                onAdd={() => console.log('Agregar Usuarios')}
            />
        </div>
    );
}

export default HomeMain;
