import { Link } from 'react-router-dom';

const About = () => {
    return (
        <section id="about" className="content-section text-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-offset-2">
                        <h2>About Me</h2>
                        <p>
                            I'm Bryan—a <a href="http://www.capitalone.com" target="_blank" rel="noopener noreferrer">developer</a>,{' '}
                            <Link to="/music">drummer, and producer</Link> based in Chicago's Ukrainian Village. When I'm not writing code or behind a kit, you'll usually find me at a bouldering gym or a concert.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
