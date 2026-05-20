import projects from '../data/projects.json';

const Projects = () => {
    return (
        <section id="projects" className="content-section text-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-offset-2">
                        <h2>Projects</h2>
                        <p className="intro-text" style={{ marginBottom: '40px' }}>
                            A couple of the side projects and applications I've designed and built.
                        </p>
                    </div>
                </div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <div className="project-card-header">
                                <h3>{project.name}</h3>
                            </div>
                            <div className="project-card-body">
                                <p className="project-description">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag, tagIdx) => (
                                        <span key={tagIdx} className="project-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="project-card-footer">
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-default btn-project"
                                >
                                    Visit Site
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
