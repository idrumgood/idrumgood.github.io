import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERNAME = 'idrumgood';
const CLIENT_ID = process.env.TRAKT_CLIENT_ID;

if (!CLIENT_ID) {
    console.error('❌ TRAKT_CLIENT_ID NOT FOUND');
    process.exit(0); // Exit gracefully so build doesn't fail if secret is missing
}

const options = {
    hostname: 'api.trakt.tv',
    path: `/users/${USERNAME}/history?limit=1`,
    headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': CLIENT_ID,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
};

const fetchData = () => {
    return new Promise((resolve, reject) => {
        https.get(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(new Error('Failed to parse response: ' + e.message));
                    }
                } else {
                    reject(new Error(`API returned ${res.statusCode}: ${data}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const run = async () => {
    console.log(`Fetching latest watched show for ${USERNAME}...`);
    try {
        const history = await fetchData();
        if (history && history.length > 0) {
            const latest = history[0];
            let result = {};

            if (latest.type === 'episode') {
                result = {
                    type: 'show',
                    title: latest.show.title,
                    episode: {
                        season: latest.episode.season,
                        number: latest.episode.number,
                        title: latest.episode.title
                    },
                    watched_at: latest.watched_at
                };
                console.log(`✅ Found show: ${result.title} S${result.episode.season}E${result.episode.number}`);
            } else if (latest.type === 'movie') {
                result = {
                    type: 'movie',
                    title: latest.movie.title,
                    year: latest.movie.year,
                    watched_at: latest.watched_at
                };
                console.log(`✅ Found movie: ${result.title} (${result.year})`);
            }

            const dataPath = path.join(__dirname, '../src/data/watching.json');
            fs.writeFileSync(dataPath, JSON.stringify(result, null, 2));
            console.log(`✅ Saved to ${dataPath}`);
        } else {
            console.log('⚠️ No history found.');
        }
    } catch (error) {
        console.error('❌ Error fetching Trakt data:', error.message);
    }
};

run();
