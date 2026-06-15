import React, { useState } from 'react';

// 1. Definir la interfaz para los enlaces de navegación
interface NavLink {
  label: string;
  url: string;
}

// 2. Definir las propiedades (Props) del componente Header
interface HeaderProps {
  title: string;
  links: NavLink[];
  logoUrl?: string; // Opcional
}

export const Header: React.FC<HeaderProps> = ({ title, links, logoUrl }) => {
  // Estado para controlar el menú desplegable en dispositivos móviles
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Sección del Logo / Título */}
        <div style={styles.logoContainer}>
          {logoUrl && <img src={logoUrl} alt="Logo" style={styles.logo} />}
          <h1 style={styles.title}>{title}</h1>
        </div>

        {/* Botón para menú móvil */}
        <button 
          onClick={toggleMenu} 
          style={styles.mobileButton}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navegación de escritorio y móvil */}
        <nav style={{ 
          ...styles.nav, 
          display: isMenuOpen ? 'flex' : 'none' 
        }} className="nav-links">
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              style={styles.link}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

// Estilos básicos en línea para asegurar independencia de librerías externas
const styles: { [key: string]: React.CSSProperties } = {
  header: {
    backgroundColor: '#1a202c',
    color: '#ffffff',
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logo: {
    height: '40px',
    width: '40px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
  mobileButton: {
    display: 'none', // Cambiar mediante CSS o media queries reales en producción
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  nav: {
    display: 'flex',
    gap: '1.5rem',
  },
  link: {
    color: '#e2e8f0',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.2s',
  },
};

export default Header;
