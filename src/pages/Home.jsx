import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Intro from '../components/Intro';
import About from './About';
import Interests from './Interests';
import Contact from './Contact';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100); // Small delay to ensure DOM is ready
            }
        }
    }, [location]);

    return (
        <>
            <Intro />
            <About />
            <Interests />
            <Contact />
        </>
    );
};

export default Home;
