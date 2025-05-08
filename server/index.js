import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'

import Category from './models/category.model.js'
import SubCategory from './models/subCategory.model.js'
import Product from './models/product.model.js'


const app = express()
app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = process.env.PORT || 1010

app.get("/",(request,response)=>{
    ///server to client
    response.json({
        message : "Server is running " + PORT
    })
})

app.use('/api/user',userRouter)
app.use("/api/category",categoryRouter)
app.use("/api/file",uploadRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/address",addressRouter)
app.use('/api/order',orderRouter)

// ---- SITEMAP ROUTE ----
app.get('/sitemap.xml', async (req, res) => {
    const domain = 'https://esmakeupstore.com'

    // Static URLs
    const staticUrls = [
        { path: '/', changefreq: 'weekly', priority: 1.0 },
        { path: '/search', changefreq: 'weekly', priority: 0.8 },
        { path: '/login', changefreq: 'monthly', priority: 0.5 },
        { path: '/register', changefreq: 'monthly', priority: 0.5 }
    ]

    // Fetch dynamic data
    const [categories, subcategories, products] = await Promise.all([
        Category.find({}).lean(),
        SubCategory.find({}).lean(),
        Product.find({}).lean()
    ])

    // Map subcategories by categoryId
    const subCategoriesByCat = {}
    subcategories.forEach(sub => {
        if (!subCategoriesByCat[sub.categoryId]) subCategoriesByCat[sub.categoryId] = []
        subCategoriesByCat[sub.categoryId].push(sub)
    })

    // Build URLs
    let urls = staticUrls.map(item => ({
        loc: `${domain}${item.path}`,
        changefreq: item.changefreq,
        priority: item.priority
    }))

    // Category/SubCategory URLs
    categories.forEach(cat => {
        const catSlug = encodeURIComponent(cat.slug || cat.name || cat._id)
        if (subCategoriesByCat[cat._id]) {
            subCategoriesByCat[cat._id].forEach(sub => {
                const subSlug = encodeURIComponent(sub.slug || sub.name || sub._id)
                urls.push({
                    loc: `${domain}/${catSlug}/${subSlug}`,
                    changefreq: 'weekly',
                    priority: 0.7
                })
            })
        }
    })

    // Product URLs
    products.forEach(prod => {
        const prodSlug = encodeURIComponent(prod.slug || prod._id)
        urls.push({
            loc: `${domain}/product/${prodSlug}`,
            changefreq: 'weekly',
            priority: 0.7
        })
    })

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        urls.map(u => 
`  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n') +
        `\n</urlset>`

    res.header('Content-Type', 'application/xml')
    res.send(xml)
})
// ---- END SITEMAP ROUTE ----

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })
})

