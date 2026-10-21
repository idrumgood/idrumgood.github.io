import { useState, useEffect } from 'react';
import config from '../config';
import playingData from '../data/playing.json';
import readingData from '../data/reading.json';

const Interests = () => {
    const [listening, setListening] = useState(null);

    useEffect(() => {
        // Fetch Last.fm Top Album (7 days to ensure recent activity, or 1month as requested)
        const fetchLastfm = async () => {
            try {
                const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${config.lastfmUser}&api_key=${config.lastfmApiKey}&period=7day&format=json&limit=1`);
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
                                    {readingData && readingData.title ? (
                                        <>
                                            Currently turning pages of <a href={readingData.link} target="_blank" rel="noopener noreferrer">"{readingData.title}"</a> by {readingData.author}
                                        </>
                                    ) : (
                                        "Taking a break from the bookshelf..."
                                    )}
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3>Playing</h3>
                                </div>
                                <div className="panel-body">
                                    {playingData && playingData.title ? (
                                        <>
                                            {"Currently playing "}
                                            <a href={`https://store.steampowered.com/app/${playingData.game_id}`} target="_blank" rel="noopener noreferrer">
                                                "{playingData.title}"
                                            </a>
                                        </>
                                    ) : (
                                        "Taking a break from the controllers..."
                                    )}
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
