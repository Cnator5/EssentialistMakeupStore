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

import Category from './models/category.model.js';
import SubCategory from './models/subCategory.model.js';
import Product from './models/product.model.js';

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
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

// ---- SITEMAP ROUTE ----
app.get('/sitemap.xml', async (req, res) => {
    try {
        // Set your base URL
        const baseUrl = process.env.FRONTEND_URL?.replace(/\/$/, '') || 'http://localhost:5173';

        // Fetch all categories, subcategories, and products
        const [categories, subCategories, products] = await Promise.all([
            Category.find(),
            SubCategory.find(),
            Product.find()
        ]);

        // Helper to encode XML special chars
        function escapeXml(unsafe) {
            return unsafe.replace(/[<>&'"]/g, function (c) {
                switch (c) {
                    case '<': return '&lt;';
                    case '>': return '&gt;';
                    case '&': return '&amp;';
                    case '\'': return '&apos;';
                    case '"': return '&quot;';
                }
            });
        }

        // Helper to format date for <lastmod>
        function formatDate(date) {
            if (!date) return '';
            const d = (typeof date === 'string') ? new Date(date) : date;
            return d.toISOString().split('T')[0];
        }

        // Start with static pages (add more as needed)
        let urls = [
            `<url><loc>${baseUrl}/</loc><changefreq>daily</changefreq></url>`,
            `<url><loc>${baseUrl}/about</loc><changefreq>monthly</changefreq></url>`,
            `<url><loc>${baseUrl}/contact</loc><changefreq>monthly</changefreq></url>`
        ];

        // Categories
        for (const cat of categories) {
            urls.push(
                `<url>
                    <loc>${baseUrl}/category/${escapeXml(cat._id.toString())}</loc>
                    ${cat.updatedAt ? `<lastmod>${formatDate(cat.updatedAt)}</lastmod>` : ''}
                    <changefreq>weekly</changefreq>
                </url>`
            );
        }
        // SubCategories
        for (const sub of subCategories) {
            urls.push(
                `<url>
                    <loc>${baseUrl}/category/${escapeXml(sub.category.toString())}/subcategory/${escapeXml(sub._id.toString())}</loc>
                    ${sub.updatedAt ? `<lastmod>${formatDate(sub.updatedAt)}</lastmod>` : ''}
                    <changefreq>weekly</changefreq>
                </url>`
            );
        }
        // Products (use slug if available, else _id)
        for (const prod of products) {
            const slug = prod.slug ? escapeXml(prod.slug) : escapeXml(prod._id.toString());
            urls.push(
                `<url>
                    <loc>${baseUrl}/product/${slug}</loc>
                    ${prod.updatedAt ? `<lastmod>${formatDate(prod.updatedAt)}</lastmod>` : ''}
                    <changefreq>weekly</changefreq>
                </url>`
            );
        }

        // Create XML
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running", PORT);
    });
});