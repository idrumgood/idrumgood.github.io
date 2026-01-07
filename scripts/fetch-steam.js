import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERNAME = 'idrumgood';
const STEAM_API_KEY = process.env.STEAM_API_KEY;

if (!STEAM_API_KEY) {
    console.error('❌ STEAM_API_KEY NOT FOUND');
    process.exit(0);
}

const fetchJSON = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
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
                    reject(new Error(`API returned ${res.statusCode}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const run = async () => {
    console.log(`Fetching Steam data for ${USERNAME}...`);
    try {
        // 1. Resolve Vanity URL to SteamID64
        const vanityUrl = `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${STEAM_API_KEY}&vanityurl=${USERNAME}`;
        const vanityData = await fetchJSON(vanityUrl);

        if (vanityData.response.success !== 1) {
            console.error('❌ Failed to resolve Steam vanity URL');
            return;
        }

        const steamId = vanityData.response.steamid;
        console.log(`✅ Resolved SteamID: ${steamId}`);

        // 2. Get Player Summaries (Check if playing now)
        const summaryUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamId}`;
        const summaryData = await fetchJSON(summaryUrl);
        const player = summaryData.response.players[0];

        let currentlyPlaying = null;
        if (player && player.gameextrainfo) {
            currentlyPlaying = {
                title: player.gameextrainfo,
                game_id: player.gameid,
                playing: true
            };
            console.log(`✅ Currently playing: ${currentlyPlaying.title}`);
        }

        // 3. Get Recently Played Games
        const recentUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&format=json`;
        const recentData = await fetchJSON(recentUrl);

        let latestGame = null;
        if (recentData.response.games && recentData.response.games.length > 0) {
            const game = recentData.response.games[0];
            latestGame = {
                title: game.name,
                game_id: game.appid,
                playing: false,
                playtime_2weeks: game.playtime_2weeks,
                playtime_forever: game.playtime_forever
            };
            console.log(`✅ Recently played: ${latestGame.title} (${game.playtime_2weeks} mins in last 2 weeks)`);
        }

        // Determine which one to save
        const result = currentlyPlaying || latestGame || { title: null };

        const dataPath = path.join(__dirname, '../src/data/playing.json');
        fs.writeFileSync(dataPath, JSON.stringify(result, null, 2));
        console.log(`✅ Saved to ${dataPath}`);

    } catch (error) {
        console.error('❌ Error fetching Steam data:', error.message);
    }
};

run();
