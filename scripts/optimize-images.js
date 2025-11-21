import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galleryDir = path.join(__dirname, '../src/assets/gallery');

if (!fs.existsSync(galleryDir)) {
    console.error(`Gallery directory not found: ${galleryDir}`);
    process.exit(1);
}

const files = fs.readdirSync(galleryDir);

(async () => {
    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const filePath = path.join(galleryDir, file);
            const tempPath = path.join(galleryDir, `temp_${file}`);

            try {
                console.log(`Optimizing ${file}...`);
                const metadata = await sharp(filePath).metadata();

                // Only resize if width is greater than 1920
                let pipeline = sharp(filePath);
                if (metadata.width > 1920) {
                    pipeline = pipeline.resize(1920);
                }

                await pipeline
                    .jpeg({ quality: 80, mozjpeg: true })
                    .toFile(tempPath);

                fs.unlinkSync(filePath);
                fs.renameSync(tempPath, filePath);
                console.log(`Done: ${file}`);
            } catch (err) {
                console.error(`Error processing ${file}:`, err);
                if (fs.existsSync(tempPath)) {
                    fs.unlinkSync(tempPath);
                }
            }
        }
    }
    console.log('All images optimized.');
})();
