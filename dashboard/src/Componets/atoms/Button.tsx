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
        primary: "bg-[#ec0000] text-[#e0e0e0] hover:bg-[#c70000]",
        secondary: "bg-[#ec0000] text-[#e0e0e0] hover:bg-[#c70000]",
        danger: "bg-green-600 text-[#e0e0e0] hover:bg-green-700"
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
