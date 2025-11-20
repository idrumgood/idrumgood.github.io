import { useState, useEffect } from 'react';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        // Dynamically load images from src/assets/gallery (lazy)
        const imageModules = import.meta.glob('../assets/gallery/*.{png,jpg,jpeg,svg}');
        const promises = Object.values(imageModules).map((module) => module());

        Promise.all(promises).then((modules) => {
            const loadedImages = modules.map((module) => module.default);
            setImages(loadedImages);
        });
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedIndex === null) return;

            if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, images]);

    const openLightbox = (index) => {
        setSelectedIndex(index);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeLightbox = () => {
        setSelectedIndex(null);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    const nextImage = (e) => {
        if (e) e.stopPropagation();
        setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        setSelectedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Swipe Logic
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextImage();
        } else if (isRightSwipe) {
            prevImage();
        }
    };

    return (
        <section id="gallery" className="content-section text-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-offset-2">
                        <h2>Gallery</h2>
                        <p>
                            I enjoy capturing moments from my life, whether it's the serenity of nature,
                            the energy of live concerts, or interesting patterns I find in the world.
                            Here are some of my favorite shots.
                        </p>
                    </div>
                </div>

                {images.length > 0 ? (
                    <div className="gallery-grid">
                        {images.map((src, index) => (
                            <GalleryItem
                                key={index}
                                src={src}
                                index={index}
                                onClick={() => openLightbox(index)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-muted">Loading images...</p>
                )}

                {selectedIndex !== null && (
                    <div
                        className="lightbox"
                        onClick={closeLightbox}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                            <img src={images[selectedIndex]} alt="Full resolution" />
                            <button className="lightbox-close" onClick={closeLightbox}>&times;</button>

                            <button className="lightbox-nav prev" onClick={prevImage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            </button>
                            <button className="lightbox-nav next" onClick={nextImage}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

const GalleryItem = ({ src, index, onClick }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="gallery-item" onClick={onClick}>
            <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
                className={`gallery-img ${loaded ? 'loaded' : ''}`}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
};

export default Gallery;
