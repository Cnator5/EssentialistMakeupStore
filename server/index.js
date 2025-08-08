import { URL } from 'url';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import uploadRouter from './route/upload.router.js';
import subCategoryRouter from './route/subCategory.route.js';
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js';
import addressRouter from './route/address.route.js';
import orderRouter from './route/order.route.js';
import ProductModel from './models/product.model.js';
import CategoryModel from './models/category.model.js';
import SubCategoryModel from './models/subCategory.model.js';
import slugify from 'slugify'; // <-- ADD THIS LINE
import paymentRoutes from './route/payments.js'; // Import your payment routes
import fetch from 'node-fetch';
import { Parser } from 'xml2js';

const app = express();

app.use(cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
    crossOriginResourcePolicy: false
}));

const PORT = process.env.PORT || 1010;

app.get('/', (req, res) => {
    res.json({
        message: "Server is running " + PORT
    });
});

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/file', uploadRouter);
app.use('/api/subcategory', subCategoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Register routes
app.use('/payments', paymentRoutes);


app.get('/mtn', (req, res) => {
  res.send('PayUnit MTN Payment API');
});
app.get('/orange', (req, res) => {
  res.send('PayUnit ORANGE Payment API');
});
app.get('/payunit', (req, res) => {
  res.send('PayUnit Payment API');
});
app.get('/payunit/return', (req, res) => {
  res.send('PayUnit Return URL');
});


// ---- SITEMAP ROUTE ----
app.get('/sitemap.xml', async (req, res) => {
    try {
        const baseUrl = process.env.FRONTEND_URL?.replace(/\/$/, '') || 'https://www.esmakeupstore.com';

        // Fetch all categories, subcategories, and products (only published)
        const [categories, subCategories, products] = await Promise.all([
            CategoryModel.find(),
            SubCategoryModel.find(),
            ProductModel.find({ publish: true })
        ]);

        function escapeXml(unsafe) {
            return unsafe ? unsafe.replace(/[<>&'"]/g, function (c) {
                switch (c) {
                    case '<': return '&lt;';
                    case '>': return '&gt;';
                    case '&': return '&amp;';
                    case '\'': return '&apos;';
                    case '"': return '&quot;';
                }
            }) : '';
        }
        function formatDate(date) {
            if (!date) return '';
            const d = (typeof date === 'string') ? new Date(date) : date;
            return d.toISOString().split('T')[0];
        }
        function valideURLConvert(name) {
            return slugify(name, { lower: true, strict: true });
        }

        // Static pages
        let urls = [
            `<url>
                <loc>${baseUrl}/</loc>
                <changefreq>daily</changefreq>
            </url>`,
            `<url>
                <loc>${baseUrl}/about</loc>
                <changefreq>monthly</changefreq>
            </url>`,
            `<url>
                <loc>${baseUrl}/contact</loc>
                <changefreq>monthly</changefreq>
            </url>`,
            `<url>
                <loc>${baseUrl}/new-arrival</loc>
                <changefreq>monthly</changefreq>
            </url>`,
            `<url>
                <loc>${baseUrl}/brands</loc>
                <changefreq>monthly</changefreq>
            </url>`
        ];

        // Categories (SEO URL)
        for (const cat of categories) {
            const catUrl = `${baseUrl}/${valideURLConvert(cat.name)}-${cat._id}`;
            urls.push(
                `<url>
                    <loc>${catUrl}</loc>
                    ${cat.updatedAt ? `<lastmod>${formatDate(cat.updatedAt)}</lastmod>` : ''}
                    <changefreq>weekly</changefreq>
                    ${cat.image ? `<image:image><image:loc>${escapeXml(cat.image)}</image:loc></image:image>` : ''}
                </url>`
            );
        }

        // SubCategories (SEO URL)
        for (const sub of subCategories) {
            const parentCat = categories.find(c => String(c._id) === String(sub.category[0]));
            if (!parentCat) continue;
            const subUrl = `${baseUrl}/${valideURLConvert(parentCat.name)}-${parentCat._id}/${valideURLConvert(sub.name)}-${sub._id}`;
            urls.push(
                `<url>
                    <loc>${subUrl}</loc>
                    ${sub.updatedAt ? `<lastmod>${formatDate(sub.updatedAt)}</lastmod>` : ''}
                    <changefreq>weekly</changefreq>
                    ${sub.image ? `<image:image><image:loc>${escapeXml(sub.image)}</image:loc></image:image>` : ''}
                </url>`
            );
        }

        // Products (SEO URL)
        for (const prod of products) {
            const sub = subCategories.find(s => String(s._id) === String(prod.subCategory[0]));
            const cat = sub ? categories.find(c => String(c._id) === String(sub.category[0])) : null;
            let prodUrl;
            if (cat && sub) {
                prodUrl = `${baseUrl}/${valideURLConvert(cat.name)}-${cat._id}/${valideURLConvert(sub.name)}-${sub._id}/${valideURLConvert(prod.name)}-${prod._id}`;
            } else {
                prodUrl = `${baseUrl}/product/${prod._id}`;
            }

            let imageTags = '';
            if (Array.isArray(prod.image)) {
                imageTags = prod.image
                    .filter(img => !!img)
                    .map(imgUrl => `<image:image><image:loc>${escapeXml(imgUrl)}</image:loc></image:image>`)
                    .join('\n');
            }
            urls.push(
                `<url>
                    <loc>${prodUrl}</loc>
                    ${prod.updatedAt ? `<lastmod>${formatDate(prod.updatedAt)}</lastmod>` : ''}
                    <changefreq>weekly</changefreq>
                    ${imageTags}
                </url>`
            );
        }

        // Final XML
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`;

        res.header('Content-Type', 'application/xml');
        res.send(xml);
    } catch (error) {
        console.error('Sitemap error:', error);
        res.status(500).send('Could not generate sitemap');
    }
});
// ---- END SITEMAP ROUTE ----



// IndexNow configuration
const INDEXNOW_HOST = 'www.esmakeupstore.com';
const INDEXNOW_KEY = 'be1ca4afe49842e29f9fcb46c96f89a9';
const INDEXNOW_KEY_LOCATION = 'https://www.esmakeupstore.com/be1ca4afe49842e29f9fcb46c96f89a9.txt';

// Utility: Extract all <loc> URLs from sitemap xml (supports sitemapindex)
async function extractUrlsFromSitemap(xml) {
    const parser = new Parser();
    const result = await parser.parseStringPromise(xml);
    let urls = [];

    if (result.urlset?.url) {
        urls = result.urlset.url.map(u => u.loc?.[0]).filter(Boolean);
    } else if (result.sitemapindex?.sitemap) {
        for (const sitemap of result.sitemapindex.sitemap) {
            const loc = sitemap.loc?.[0];
            if (loc) {
                const subXml = await fetch(loc).then(r => r.text());
                urls = urls.concat(await extractUrlsFromSitemap(subXml));
            }
        }
    }
    return urls;
}

// Utility: Submit a batch to IndexNow
async function submitToIndexNow(urlList) {
    const payload = {
        host: INDEXNOW_HOST,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList,
    };

    const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
    });

    if (res.ok) {
        return { ok: true, count: urlList.length };
    } else {
        const text = await res.text();
        return { ok: false, status: res.status, text };
    }
}

// === EXPRESS ROUTE ===
app.get('/indexnow-submit-sitemap', async (req, res) => {
    try {
        const sitemapUrl = `${process.env.FRONTEND_URL?.replace(/\/$/, '') || 'https://www.esmakeupstore.com'}/sitemap.xml`;
        const xml = await fetch(sitemapUrl).then(r => r.text());
        const urls = await extractUrlsFromSitemap(xml);

        if (!urls.length) return res.status(404).json({ error: 'No URLs found in sitemap' });

        // Batch in groups of 10,000
        const BATCH = 10000;
        const results = [];
        for (let i = 0; i < urls.length; i += BATCH) {
            const batch = urls.slice(i, i + BATCH);
            // eslint-disable-next-line no-await-in-loop
            const result = await submitToIndexNow(batch);
            results.push(result);
        }

        res.json({
            message: 'Submitted URLs to IndexNow',
            total: urls.length,
            batches: results,
        });
    } catch (error) {
        console.error('IndexNow submit error:', error);
        res.status(500).json({ error: error.message || error.toString() });
    }
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running", PORT);
    });
});