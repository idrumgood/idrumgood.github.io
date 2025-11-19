import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const closeNav = () => {
        setIsNavOpen(false);
    };

    // Helper to determine if we should use hash link or full route
    const isHome = location.pathname === '/';

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                {isHome ? (
                    <a href="#page-top" className="navbar-brand" onClick={closeNav}>
                        <span className="light">idrum</span>good
                    </a>
                ) : (
                    <Link to="/" className="navbar-brand" onClick={closeNav}>
                        <span className="light">idrum</span>good
                    </Link>
                )}
                <button
                    className="navbar-toggle"
                    aria-label="Toggle navigation"
                    onClick={toggleNav}
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
                <div className={`navbar-collapse ${isNavOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav">
                        {/* 
              If we are on Home, use standard anchor tags for smooth scroll (if CSS scroll-behavior is set).
              If we are on another page (future), use Link with hash to navigate back to Home + hash.
            */}
                        <li>
                            {isHome ? (
                                <a href="#about" onClick={closeNav}>About</a>
                            ) : (
                                <Link to="/#about" onClick={closeNav}>About</Link>
                            )}
                        </li>
                        <li>
                            {isHome ? (
                                <a href="#interests" onClick={closeNav}>Interests</a>
                            ) : (
                                <Link to="/#interests" onClick={closeNav}>Interests</Link>
                            )}
                        </li>
                        <li>
                            {isHome ? (
                                <a href="#contact" onClick={closeNav}>Contact</a>
                            ) : (
                                <Link to="/#contact" onClick={closeNav}>Contact</Link>
                            )}
                        </li>
                        <li>
                            <Link to="/gallery" onClick={closeNav} className={location.pathname === '/gallery' ? 'active' : ''}>Gallery</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
