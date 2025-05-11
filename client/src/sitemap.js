export default function sitemap() {
  return [
    {
      url: 'https://esmakeupstore.com',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://esmakeupstore.com/es',
          de: 'https://esmakeupstore.com/de',
        },
      },
    },
    {
      url: 'https://esmakeupstore.com/product',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://esmakeupstore.com/es/product',
          de: 'https://esmakeupstore.com/de/product',
        },
      },
    },
    {
      url: 'https://esmakeupstore.com/product/:product',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://esmakeupstore.com/es/product/:product',
          de: 'https://esmakeupstore.com/de/product/:product',
        },
      },
    },
    {
      url: 'https://esmakeupstore.com/search',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://esmakeupstore.com/es/search',
          de: 'https://esmakeupstore.com/de/search',
        },
      },
    },
    {
      url: 'https://esmakeupstore.com/brands',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://esmakeupstore.com/es/brands',
          de: 'https://esmakeupstore.com/de/brands',
        },
      },
    },
    {
      url: 'https://esmakeupstore.com/new-arrival',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://esmakeupstore.com/es/new-arrival',
          de: 'https://esmakeupstore.com/de/new-arrival',
        },
      },
    },
    {
      url: 'https://esmakeupstore.com/category',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://esmakeupstore.com/es/category',
          de: 'https://esmakeupstore.com/de/category',
        },
      },
    },
    {
      url: 'https://esmakeupstore.com/subCategory',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://esmakeupstore.com/es/subCategory',
          de: 'https://esmakeupstore.com/de/subCategory',
        },
      },
    },
    {
      url: 'https://esmakeupstore.com/about',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://esmakeupstore.com/es/about',
          de: 'https://esmakeupstore.com/de/about',
        },
      },
    },
    {
      url: 'https://esmakeupstore.com/blog',
      lastModified: new Date(),
      alternates: {
        languages: {
          es: 'https://esmakeupstore.com/es/blog',
          de: 'https://esmakeupstore.com/de/blog',
        },
      },
    },
  ]
}