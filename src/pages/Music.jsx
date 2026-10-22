import { useState } from 'react';
import musicData from '../data/music.json';
import { useTheme } from '../context/ThemeContext';

const PLATFORM_META = {
    spotify: {
        label: 'Spotify',
        icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
        )
    },
    appleMusic: {
        label: 'Apple Music',
        icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M19.467 1.482a.89.89 0 0 0-.69-.182l-10 1.667a.89.89 0 0 0-.744.878v11.61a3.556 3.556 0 1 0 1.778 3.079V8.698l8.222-1.37v6.339a3.556 3.556 0 1 0 1.778 3.079V2.222a.89.89 0 0 0-.344-.74z" />
            </svg>
        )
    },
    qobuz: {
        label: 'Qobuz',
        icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M12 1a11 11 0 1 0 6.84 19.63l2.76 2.77 1.41-1.41-2.76-2.77A11 11 0 0 0 12 1zm0 3a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
            </svg>
        )
    },
    tidal: {
        label: 'Tidal',
        icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996 4.004 12l4.004-4.004L12.012 12l-4.004 4.004 4.004 4.004 4.004-4.004L12.012 12l4.004-4.004-4.004-4.004zM16.016 7.996l3.992-4.004L24 7.996 20.008 12l-3.992-4.004z" />
            </svg>
        )
    },
    amazonMusic: {
        label: 'Amazon Music',
        icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.659.659 0 0 1-.753.075c-1.057-.879-1.244-1.286-1.826-2.124-1.746 1.779-2.982 2.313-5.242 2.313-2.681 0-4.768-1.656-4.768-4.968 0-2.587 1.401-4.349 3.392-5.211 1.727-.754 4.142-.89 5.995-1.097v-.41c0-.753.058-1.644-.386-2.294-.387-.582-1.124-.822-1.775-.822-1.205 0-2.277.619-2.54 1.898-.054.285-.261.566-.549.58L5.98 5.479c-.259-.058-.548-.266-.472-.66C6.216 1.116 9.575 0 12.607 0c1.545 0 3.567.411 4.785 1.581 1.545 1.44 1.399 3.362 1.399 5.451v4.938c0 1.485.616 2.138 1.196 2.942.204.285.249.63-.01.844-.647.541-1.797 1.547-2.432 2.099l-.401-.06zM21.178 20.89C18.587 22.8 14.832 23.816 11.58 23.816c-4.544 0-8.636-1.678-11.724-4.469-.243-.22-.026-.52.266-.349 3.337 1.944 7.466 3.112 11.732 3.112 2.877 0 6.042-.596 8.959-1.832.439-.188.807.289.365.612zm1.008-1.152c-.33-.423-2.186-.201-3.021-.101-.254.031-.293-.19-.064-.35 1.481-1.041 3.908-.741 4.189-.392.283.352-.074 2.787-1.464 3.949-.214.179-.418.084-.323-.154.313-.781 1.014-2.529.683-2.952z" />
            </svg>
        )
    },
    bandcamp: {
        label: 'Bandcamp',
        icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M0 18.75l7.437-13.5H24l-7.438 13.5H0z" />
            </svg>
        )
    },
    soundcloud: {
        label: 'SoundCloud',
        icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M11.56 8.87V17h8.76c1.85 0 3.35-1.5 3.35-3.35 0-1.69-1.25-3.09-2.88-3.32.09-.36.14-.74.14-1.13 0-2.61-2.12-4.73-4.73-4.73-1.99 0-3.7 1.23-4.4 2.97-.08.15-.16.29-.24.43zM9.2 9.6v7.4h1.18V9.25c-.41.07-.81.19-1.18.35zm-2.36 1.15V17h1.18v-6.71c-.42.12-.81.28-1.18.46zm-2.36 1.62V17h1.18v-4.63H4.48zm-2.36 1.18V17H3.3v-3.45H2.12zM.33 14.73V17h.61v-2.27H.33z" />
            </svg>
        )
    },
    deezer: {
        label: 'Deezer',
        icon: (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.027h5.189V8.38H6.27zm12.54 0v3.027H24V8.38h-5.19zM6.27 12.594v3.027h5.189v-3.027H6.27zm6.271 0v3.027h5.19v-3.027h-5.19zm6.269 0v3.027H24v-3.027h-5.19zM0 16.81v3.029h5.19v-3.03H0zm6.27 0v3.029h5.189v-3.03H6.27zm6.271 0v3.029h5.19v-3.03h-5.19zm6.269 0v3.029H24v-3.03h-5.19z" />
            </svg>
        )
    }
};

const EmbeddedPlayer = ({ embed, theme, compact = false }) => {
    const [activeTrackIndex, setActiveTrackIndex] = useState(0);

    if (!embed) return null;

    const accentHex = theme === 'light' ? '2a9d75' : '42dca3';
    const bgHex = theme === 'light' ? 'ffffff' : '111111';

    if (embed.provider === 'soundcloud') {
        const tracks = embed.tracks || [];
        const currentTrack = tracks[activeTrackIndex] || tracks[0];
        if (!currentTrack) return null;

        const scSrc = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
            currentTrack.apiUrl
        )}&color=%23${accentHex}&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;

        return (
            <div className="music-embed-wrapper">
                {tracks.length > 1 && (
                    <div className="music-embed-track-tabs" role="tablist" aria-label="Select track to stream">
                        {tracks.map((track, idx) => (
                            <button
                                key={track.apiUrl}
                                type="button"
                                className={`music-track-tab ${idx === activeTrackIndex ? 'active' : ''}`}
                                onClick={() => setActiveTrackIndex(idx)}
                            >
                                <span className="music-track-tab-num">{idx + 1}.</span> {track.title}
                            </button>
                        ))}
                    </div>
                )}
                <iframe
                    title={`Stream ${currentTrack.title} on SoundCloud`}
                    width="100%"
                    height={compact ? '125' : '166'}
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay; encrypted-media"
                    src={scSrc}
                    className="music-embed-iframe"
                />
            </div>
        );
    }

    if (embed.provider === 'bandcamp' && embed.bandcampId) {
        const bcSrc = `https://bandcamp.com/EmbeddedPlayer/${embed.bandcampId}/size=large/bgcol=${bgHex}/linkcol=${accentHex}/tracklist=false/artwork=none/transparent=true/`;
        return (
            <div className="music-embed-wrapper">
                <iframe
                    title="Stream on Bandcamp"
                    style={{ border: 0, width: '100%', height: '120px' }}
                    src={bcSrc}
                    seamless
                    className="music-embed-iframe"
                />
            </div>
        );
    }

    if (embed.provider === 'audio' && embed.audioSrc) {
        return (
            <div className="music-embed-wrapper">
                <audio controls preload="metadata" src={embed.audioSrc} style={{ width: '100%' }}>
                    Your browser does not support the audio element.
                </audio>
            </div>
        );
    }

    return null;
};

const PlatformLinks = ({ links, className = '' }) => {
    if (!links) return null;
    const entries = Object.entries(links).filter(([, url]) => Boolean(url));

    return (
        <div className={`music-platform-links ${className}`}>
            {entries.map(([platformKey, url]) => {
                const meta = PLATFORM_META[platformKey] || { label: platformKey, icon: null };
                return (
                    <a
                        key={platformKey}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`music-platform-btn platform-${platformKey}`}
                    >
                        {meta.icon && <span className="platform-icon">{meta.icon}</span>}
                        <span>{meta.label}</span>
                    </a>
                );
            })}
        </div>
    );
};

const formatReleaseYear = (dateStr) => {
    if (!dateStr) return '';
    return dateStr.slice(0, 4);
};

const formatReleaseDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(`${dateStr}T00:00:00`);
    if (Number.isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const Music = () => {
    const { theme } = useTheme();
    const [selectedArtist, setSelectedArtist] = useState('All');
    const [expandedEmbeds, setExpandedEmbeds] = useState({});

    const { artistProfile, featuredReleaseId, releases } = musicData;

    const featuredRelease =
        releases.find((r) => r.id === featuredReleaseId) ||
        releases.find((r) => r.featured) ||
        releases[0];

    const artistFilters = ['All', ...new Set(releases.map((r) => r.artist))];

    const filteredReleases =
        selectedArtist === 'All'
            ? releases
            : releases.filter((r) => r.artist === selectedArtist);

    const toggleCardPlayer = (id) => {
        setExpandedEmbeds((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <section id="music" className="content-section text-center">
            <div className="container">
                {/* Page Header & Quick Artist Platform Jump Links */}
                <div className="row">
                    <div className="col-lg-8 col-offset-2">
                        <h2>Music</h2>
                        <p className="intro-text music-intro-text">
                            {artistProfile.tagline}
                        </p>
                        <div className="music-artist-jump">
                            <span className="music-jump-label">Listen to {artistProfile.name} on</span>
                            <PlatformLinks links={artistProfile.links} className="music-hero-platforms" />
                        </div>
                    </div>
                </div>

                {/* Featured Single / Release */}
                {featuredRelease && (
                    <div className="music-featured-card">
                        <div className="music-featured-badge-row">
                            <span className="music-featured-badge">
                                Featured {featuredRelease.type || 'Release'}
                            </span>
                            <span className="music-featured-date">
                                Released {formatReleaseDate(featuredRelease.releaseDate)}
                            </span>
                        </div>

                        <div className="music-featured-content">
                            <div className="music-featured-artwork-wrap">
                                <img
                                    src={featuredRelease.artwork}
                                    alt={`${featuredRelease.title} cover art`}
                                    className="music-featured-artwork"
                                />
                            </div>

                            <div className="music-featured-details">
                                <div className="music-featured-heading">
                                    <span className="music-release-artist">{featuredRelease.artist}</span>
                                    <h3>{featuredRelease.title}</h3>
                                    {featuredRelease.description && (
                                        <p className="music-featured-description">
                                            {featuredRelease.description}
                                        </p>
                                    )}
                                </div>

                                {featuredRelease.embed && (
                                    <div className="music-featured-player">
                                        <div className="music-player-header">
                                            <span className="music-player-dot" />
                                            <span>Stream Full Track</span>
                                        </div>
                                        <EmbeddedPlayer embed={featuredRelease.embed} theme={theme} />
                                    </div>
                                )}

                                <div className="music-featured-links-block">
                                    <span className="music-links-heading">Stream or Buy Release</span>
                                    <PlatformLinks links={featuredRelease.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Discography & Past Bands Section */}
                <div className="music-discography-header">
                    <h3>Releases &amp; Past Projects</h3>
                    <p className="music-discography-subtitle">
                        Solo releases under <strong>idrumgood</strong> alongside past bands{' '}
                        <strong>Sunblood</strong>, <strong>Rakunk</strong>, and{' '}
                        <strong>The Van Goghs</strong>.
                    </p>

                    <div className="music-filter-tabs" role="tablist" aria-label="Filter releases by artist">
                        {artistFilters.map((artist) => {
                            const count =
                                artist === 'All'
                                    ? releases.length
                                    : releases.filter((r) => r.artist === artist).length;
                            return (
                                <button
                                    key={artist}
                                    type="button"
                                    role="tab"
                                    aria-selected={selectedArtist === artist}
                                    className={`music-filter-btn ${selectedArtist === artist ? 'active' : ''}`}
                                    onClick={() => setSelectedArtist(artist)}
                                >
                                    {artist} <span className="music-filter-count">{count}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Releases Grid */}
                <div className="music-releases-grid">
                    {filteredReleases.map((release) => {
                        const isPlayerOpen = Boolean(expandedEmbeds[release.id]);
                        return (
                            <article key={release.id} className="music-release-card">
                                <div className="music-card-top">
                                    <div className="music-card-art-container">
                                        <img
                                            src={release.artwork}
                                            alt={`${release.title} by ${release.artist}`}
                                            loading="lazy"
                                            className="music-card-art"
                                        />
                                    </div>
                                    <div className="music-card-meta">
                                        <div className="music-card-badges">
                                            <span className="music-artist-badge">{release.artist}</span>
                                            <span className="music-type-badge">
                                                {release.type} &bull; {formatReleaseYear(release.releaseDate)}
                                            </span>
                                        </div>
                                        <h4 className="music-card-title">{release.title}</h4>
                                        {release.description && (
                                            <p className="music-card-desc">{release.description}</p>
                                        )}
                                    </div>
                                </div>

                                {release.tracks && release.tracks.length > 1 && (
                                    <div className="music-card-tracklist">
                                        <span className="music-tracklist-label">Tracks:</span>
                                        <div className="project-tags">
                                            {release.tracks.map((track, idx) => (
                                                <span key={idx} className="project-tag">
                                                    {idx + 1}. {track}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {release.embed && (
                                    <div className="music-card-stream-section">
                                        <button
                                            type="button"
                                            className={`music-stream-toggle ${isPlayerOpen ? 'open' : ''}`}
                                            onClick={() => toggleCardPlayer(release.id)}
                                        >
                                            <span>{isPlayerOpen ? 'Hide Player' : 'Stream Full Audio Here'}</span>
                                            <span className="music-stream-toggle-icon">
                                                {isPlayerOpen ? '−' : '▶'}
                                            </span>
                                        </button>
                                        {isPlayerOpen && (
                                            <div className="music-card-embed">
                                                <EmbeddedPlayer
                                                    embed={release.embed}
                                                    theme={theme}
                                                    compact
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="music-card-footer">
                                    <PlatformLinks links={release.links} className="music-card-platforms" />
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Music;
