import fetch from 'node-fetch';
import { Parser } from 'xml2js';

const INDEXNOW_HOST = 'www.esmakeupstore.com';
const INDEXNOW_KEY = '49ada6e440e747b1ad3d7ba15dad6330';
const INDEXNOW_KEY_LOCATION = 'https://www.esmakeupstore.com/49ada6e440e747b1ad3d7ba15dad6330.txt';

// Utility: Extract all <loc> URLs from sitemap XML (supports sitemapindex too)
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

// Utility: Submit a batch of URLs to IndexNow
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

    // Batch in groups of 10,000 per IndexNow docs
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