import https from 'https';
import config from '../src/config.js';

const fetchUrl = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const fetchText = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; idrumgood.github.io/1.0)',
                'Accept': 'application/rss+xml, application/xml, text/xml'
            }
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(data);
                } else {
                    reject(new Error(`Status ${res.statusCode}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const verifyGoodreads = async () => {
    console.log('Verifying Goodreads...');
    try {
        const url = `https://www.goodreads.com/review/list_rss/${config.goodreadsId}?shelf=currently-reading`;
        const xml = await fetchText(url);
        if (xml.includes('<rss')) {
            console.log('✅ Goodreads OK');
            const titleMatch = xml.match(/<item>[\s\S]*?<title>([\s\S]*?)<\/title>/i);
            if (titleMatch) {
                const title = titleMatch[1].replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, '$1').trim();
                console.log('   Book:', title);
            } else {
                console.log('   No books currently reading found.');
            }
        } else {
            console.error('❌ Goodreads Failed: Unexpected response');
        }
    } catch (error) {
        console.error('❌ Goodreads Error:', error.message);
    }
};

const verifyLastfm = async () => {
    console.log('Verifying Last.fm...');
    try {
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${config.lastfmUser}&api_key=${config.lastfmApiKey}&period=7day&format=json&limit=1`;
        const data = await fetchUrl(url);
        if (data.topalbums) {
            console.log('✅ Last.fm OK');
            if (data.topalbums.album && data.topalbums.album.length > 0) {
                console.log('   Album:', data.topalbums.album[0].name);
            } else {
                console.log('   No albums found.');
            }
        } else {
            console.error('❌ Last.fm Failed:', data);
        }
    } catch (error) {
        console.error('❌ Last.fm Error:', error.message);
    }
};

const verifySteam = async () => {
    console.log('Verifying Steam...');
    const steamKey = process.env.STEAM_API_KEY;
    if (!steamKey) {
        console.warn('⚠️ Steam Skipped: STEAM_API_KEY not found in environment');
        return;
    }
    try {
        const vanityUrl = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${steamKey}&vanityurl=idrumgood`;
        const data = await fetchUrl(vanityUrl);
        if (data.response && data.response.success === 1) {
            console.log('✅ Steam OK (Resolved SteamID:', data.response.steamid + ')');
        } else {
            console.error('❌ Steam Failed to resolve vanity URL:', data);
        }
    } catch (error) {
        console.error('❌ Steam Error:', error.message);
    }
};

(async () => {
    await verifyGoodreads();
    await verifyLastfm();
    await verifySteam();
})();


