import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../src/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
                    reject(new Error(`API returned ${res.statusCode}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const extractTag = (xml, tag) => {
    const match = xml.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i'));
    if (!match) return null;
    return match[1]
        .replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, '$1')
        .trim()
        .replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, '$1')
        .trim();
};

const run = async () => {
    console.log(`Fetching Goodreads data for ${config.goodreadsId}...`);
    try {
        const url = `https://www.goodreads.com/review/list_rss/${config.goodreadsId}?shelf=currently-reading`;
        const xml = await fetchText(url);

        const itemMatch = xml.match(/<item>([\s\S]*?)<\/item>/i);
        let result = { title: null };

        if (itemMatch) {
            const itemXml = itemMatch[1];
            const title = extractTag(itemXml, 'title');
            const author = extractTag(itemXml, 'author_name');
            const link = extractTag(itemXml, 'link');
            const image = extractTag(itemXml, 'book_image_url');

            if (title) {
                result = {
                    title,
                    author,
                    link,
                    image
                };
                console.log(`✅ Currently reading: "${result.title}" by ${result.author}`);
            }
        } else {
            console.log('ℹ️ No currently-reading books found.');
        }

        const dataPath = path.join(__dirname, '../src/data/reading.json');
        fs.writeFileSync(dataPath, JSON.stringify(result, null, 2) + '\n');
        console.log(`✅ Saved to ${dataPath}`);
    } catch (error) {
        console.error('❌ Error fetching Goodreads data:', error.message);
    }
};

run();
