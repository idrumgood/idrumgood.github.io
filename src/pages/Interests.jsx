import { useState, useEffect } from 'react';
import config from '../config';

const Interests = () => {
    const [reading, setReading] = useState(null);
    const [listening, setListening] = useState(null);

    useEffect(() => {
        // Fetch Goodreads Currently Reading
        const fetchGoodreads = async () => {
            try {
                const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.goodreads.com/review/list_rss/${config.goodreadsId}?shelf=currently-reading`);
                const data = await response.json();
                if (data.items && data.items.length > 0) {
                    const book = data.items[0];
                    // Extract author from title if needed or use author field if available and clean
                    setReading({
                        title: book.title,
                        author: book.author,
                        link: book.link,
                        image: book.thumbnail // rss2json often provides a thumbnail
                    });
                }
            } catch (error) {
                console.error("Error fetching Goodreads data:", error);
            }
        };

        // Fetch Last.fm Top Album (7 days to ensure recent activity, or 1month as requested)
        const fetchLastfm = async () => {
            try {
                const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${config.lastfmUser}&api_key=${config.lastfmApiKey}&period=1month&format=json&limit=1`);
                const data = await response.json();
                if (data.topalbums && data.topalbums.album && data.topalbums.album.length > 0) {
                    const album = data.topalbums.album[0];
                    setListening({
                        title: album.name,
                        artist: album.artist.name,
                        link: album.url,
                        image: album.image[2]['#text'] // usually the large size
                    });
                }
            } catch (error) {
                console.error("Error fetching Last.fm data:", error);
            }
        };

        fetchGoodreads();
        fetchLastfm();
    }, []);

    return (
        <section id="interests" className="content-section text-center">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-offset-2">
                        <h2>What I'm Into</h2>
                        <div className="grid-2">
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3>Reading</h3>
                                </div>
                                <div className="panel-body">
                                    {reading ? (
                                        <>
                                            Currently turning pages of <a href={reading.link} target="_blank" rel="noopener noreferrer">"{reading.title}"</a> by {reading.author}
                                        </>
                                    ) : (
                                        "Loading..."
                                    )}
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3>Watching</h3>
                                </div>
                                <div className="panel-body">
                                    Working my way through "Alone Season 10"
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3>Playing</h3>
                                </div>
                                <div className="panel-body">
                                    Fighting machines in "ARC Raiders"
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3>Listening</h3>
                                </div>
                                <div className="panel-body">
                                    {listening ? (
                                        <>
                                            On repeat: <a href={listening.link} target="_blank" rel="noopener noreferrer">"{listening.title}"</a> by {listening.artist}
                                        </>
                                    ) : (
                                        "Loading..."
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Interests;
