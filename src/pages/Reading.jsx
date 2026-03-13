import blogs from '../data/blogs.json';

const Reading = () => {
    return (
        <section id="inspiration" className="content-section text-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-offset-2">
                        <h2>Curated Inspiration</h2>
                        <p className="intro-text" style={{ marginBottom: '40px' }}>
                            Where I wander to find new ideas, alternative perspectives, and general rabbit-hole fuel.
                        </p>
                        <ul className="reading-list">
                            {blogs.map((blog, index) => (
                                <li key={index}>
                                    <a 
                                        href={blog.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="reading-item-link"
                                    >
                                        <div className="reading-item">
                                            <h3>{blog.name}</h3>
                                            <p>{blog.description}</p>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reading;
