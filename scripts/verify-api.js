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

const verifyGoodreads = async () => {
    console.log('Verifying Goodreads...');
    try {
        const url = `https://api.rss2json.com/v1/api.json?rss_url=https://www.goodreads.com/review/list_rss/${config.goodreadsId}?shelf=currently-reading`;
        const data = await fetchUrl(url);
        if (data.status === 'ok' && data.items) {
            console.log('✅ Goodreads OK');
            if (data.items.length > 0) {
                console.log('   Book:', data.items[0].title);
            } else {
                console.log('   No books currently reading found.');
            }
        } else {
            console.error('❌ Goodreads Failed:', data);
        }
    } catch (error) {
        console.error('❌ Goodreads Error:', error.message);
    }
};

const verifyLastfm = async () => {
    console.log('Verifying Last.fm...');
    try {
        const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${config.lastfmUser}&api_key=${config.lastfmApiKey}&period=1month&format=json&limit=1`;
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

(async () => {
    await verifyGoodreads();
    await verifyLastfm();
})();
