import StatCard from "../../Componets/molecules/StatCard";
import Button from "../../Componets/atoms/Button";

// Ya no necesitas el div con p-8 ni el h1 extra, 
// el Layout ya se encarga de eso.

function HomeMain() {
    return (
        <div className="flex flex-col gap-4">
            <StatCard 
                title="Productos" 
                count={123} 
                onView={() => console.log('Ir a lista')} 
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
    )
}

export default HomeMain;