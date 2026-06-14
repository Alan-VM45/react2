import StatCard from "../../Componets/molecules/StatCard";
import Button from "../../Componets/atoms/Button";
import { useNavigate } from 'react-router-dom';

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
                title="Tiendas" 
                count={13} 
                onView={() => console.log('Ir a lista')} 
                onAdd={() => console.log('Agregar Tienda')}
            />
            
            <div className="mt-4">
                <Button 
                    label="Descargar Reporte" 
                    variant="secondary" 
                    onClick={() => alert('Descargando...')} 
                />
            </div>
        </div>
    );
}

export default HomeMain;
