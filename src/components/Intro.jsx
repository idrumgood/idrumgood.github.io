const Intro = () => {
    return (
        <header id="page-top" className="intro">
            <div className="intro-body">
                <div className="container">
                    <h1 className="brand-heading">
                        <span className="light">idrum</span>good
                    </h1>
                    <p className="intro-text">The website of Chicago drummer and developer Bryan Dunk</p>
                    <a href="#about" className="btn btn-circle page-scroll">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m7 13 5 5 5-5" />
                            <path d="m7 6 5 5 5-5" />
                        </svg>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Intro;
