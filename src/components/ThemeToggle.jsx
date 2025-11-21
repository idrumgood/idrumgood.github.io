import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--heading-color)',
                fontSize: '1.2rem',
                padding: '0 10px',
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    );
};

export default ThemeToggle;
