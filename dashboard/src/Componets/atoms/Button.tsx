interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    type?: 'button' | 'submit' | 'reset';
}

const Button = ({ label, onClick, variant = 'primary', type = 'button' }: ButtonProps) => {
// Mapeo de estilos para cada variante
    const baseStyle = "px-4 py-2 rounded transition font-medium";
    const variants = {
        primary: "bg-green-700 text-white hover:bg-green-700",
        secondary: "bg-green-700 text-white hover:bg-gray-600",
        danger: "bg-green-700 text-red-200 hover:bg-green-600"
    };

    return (
        <button 
        type={type} 
        onClick={onClick} 
        className={`${baseStyle} ${variants[variant]}`}
        >
        {label}
        </button>
    );
};

export default Button;
