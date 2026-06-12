import StatCard from "../../Componets/molecules/StatCard";
import Button from "../../Componets/atoms/Button";
type Props = {}

function HomeMain({}: Props) {
    return (
        <div className="p-8">
        <h1 className="text-2xl font-bold text-white mb-8">¡Hola!</h1>

        {/* Ejemplo de integración dentro de una estructura */}
        <div className="flex flex-col gap-4">
        <StatCard 
            title="Productos" 
            count={123} 
            onView={() => console.log('Ir a lista')} 
            onAdd={() => console.log('Agregar producto')} 
        />
        
        {/* También puedes usar el botón solo en cualquier parte */}
        <div className="mt-4">
        <Button 
            label="Descargar Reporte" 
            variant="secondary" 
            onClick={() => alert('Descargando...')} 
        />
        </div>
    </div>
    </div>
    )
}

export default HomeMain;