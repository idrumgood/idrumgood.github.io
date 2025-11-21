import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galleryDir = path.join(__dirname, '../src/assets/gallery');

// Get files from command line arguments
const args = process.argv.slice(2);
let filesToProcess = [];

if (args.length > 0) {
    // If arguments are provided, use them (filter for images)
    filesToProcess = args.filter(file => file.match(/\.(jpg|jpeg|png)$/i));
    // Resolve absolute paths if needed, but lint-staged usually passes absolute paths
} else {
    // Fallback to scanning directory if no args
    if (!fs.existsSync(galleryDir)) {
        console.error(`Gallery directory not found: ${galleryDir}`);
        process.exit(1);
    }
    filesToProcess = fs.readdirSync(galleryDir)
        .filter(file => file.match(/\.(jpg|jpeg|png)$/i))
        .map(file => path.join(galleryDir, file));
}

if (filesToProcess.length === 0) {
    console.log('No images to process.');
    process.exit(0);
}

(async () => {
    for (const filePath of filesToProcess) {
        // Ensure file exists (it might be deleted or renamed)
        if (!fs.existsSync(filePath)) {
            continue;
        }

        const dir = path.dirname(filePath);
        const ext = path.extname(filePath);
        const name = path.basename(filePath, ext);
        const tempPath = path.join(dir, `temp_${name}${ext}`);

        try {
            console.log(`Optimizing ${path.basename(filePath)}...`);
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
            console.log(`Done: ${path.basename(filePath)}`);
        } catch (err) {
            console.error(`Error processing ${path.basename(filePath)}:`, err);
            if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
            }
        }
    }
    console.log('All images optimized.');
})();
