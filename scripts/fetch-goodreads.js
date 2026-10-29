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
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                const redirectUrl = new URL(res.headers.location, url).toString();
                return resolve(fetchText(redirectUrl));
            }
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                if (res.statusCode === 200) {
                    resolve(data);
                } else {
                    reject(new Error(`HTTP ${res.statusCode} for ${url}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const decodeEntities = (str) => {
    if (!str) return null;
    return str
        .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
        .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .trim();
};

const run = async () => {
    console.log(`Fetching Goodreads data for ${config.goodreadsId}...`);
    try {
        const url = `https://www.goodreads.com/user/show/${config.goodreadsId}`;
        const html = await fetchText(url);

        const sectionMatch = html.match(/id="currentlyReadingReviews"([\s\S]*?)<\/div>\s*<\/div>\s*<div class="bigBoxBottom">/i);
        let result = { title: null };

        if (sectionMatch) {
            const sectionHtml = sectionMatch[1];

            // Extract short title and link from the cover anchor, falling back to bookTitle anchor
            const coverAnchorMatch = sectionHtml.match(/<div class="firstcol">\s*<a[^>]*title="([^"]+)"[^>]*href="([^"]+)"/i);
            const bookTitleMatch = sectionHtml.match(/<a class="bookTitle" href="([^"]+)">([\s\S]*?)<\/a>/i);
            const authorMatch = sectionHtml.match(/<a class="authorName"[^>]*>([\s\S]*?)<\/a>/i);
            const imageMatch = sectionHtml.match(/<img[^>]*src="([^"]+)"/i);

            const rawTitle = coverAnchorMatch ? coverAnchorMatch[1] : (bookTitleMatch ? bookTitleMatch[2] : null);
            const rawHref = coverAnchorMatch ? coverAnchorMatch[2] : (bookTitleMatch ? bookTitleMatch[1] : null);

            const title = decodeEntities(rawTitle);
            const author = authorMatch ? decodeEntities(authorMatch[1]) : null;
            const link = rawHref ? new URL(decodeEntities(rawHref), 'https://www.goodreads.com').toString() : null;
            const image = imageMatch ? decodeEntities(imageMatch[1]) : null;

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
