import { useState, useEffect } from 'react';

const Intro = () => {
    const [bgImage, setBgImage] = useState(null);

    useEffect(() => {
        // Load all gallery image paths (lazy)
        const imageModules = import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,svg}');
        const imagePaths = Object.keys(imageModules);

        if (imagePaths.length > 0) {
            const randomPath = imagePaths[Math.floor(Math.random() * imagePaths.length)];

            // Dynamically import the selected image
            imageModules[randomPath]().then((module) => {
                const src = module.default;
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    setBgImage(src);
                };
            });
        }
    }, []);

    return (
        <header id="page-top" className="intro">
            {bgImage && (
                <div
                    className="intro-bg"
                    style={{ backgroundImage: `url(${bgImage})` }}
                />
            )}
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
