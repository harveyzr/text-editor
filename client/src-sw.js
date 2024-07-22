// Import necessary Workbox modules
const { warmStrategyCache } = require('workbox-recipes');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { CacheFirst } = require('workbox-strategies');

// Precache the files listed in the manifest
precacheAndRoute(self.__WB_MANIFEST);

// Define a caching strategy for pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    // Cache responses with these HTTP status codes
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Set expiration for cached items (30 days)
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm the cache with specific URLs
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register a route for navigation requests to use the page cache
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Set up asset caching for images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache', // Name of the cache for images
    plugins: [
      // Cache responses with these HTTP status codes
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      // Set limits on the number of entries and expiration (30 days)
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);


