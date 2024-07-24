// Import necessary Workbox modules for caching and routing
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { warmStrategyCache } = require('workbox-recipes');
const { registerRoute } = require('workbox-routing');
const { CacheFirst } = require('workbox-strategies');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');

// Precache the files listed in the manifest
// This ensures that these files are available offline
precacheAndRoute(self.__WB_MANIFEST);

// Define a caching strategy for pages using Cache First strategy
const pageCache = new CacheFirst({
  cacheName: 'page-cache', // Name of the cache for pages
  plugins: [
    // Plugin to cache responses with specific HTTP status codes
    new CacheableResponsePlugin({
      statuses: [0, 200], // Cache responses with status 0 (opaque responses) and 200 (OK)
    }),
    // Plugin to set expiration for cached items
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Set expiration to 30 days
    }),
  ],
});

// Warm the cache with specific URLs to ensure they are cached on service worker activation
warmStrategyCache({
  urls: ['/index.html', '/'], // URLs to warm up
  strategy: pageCache, // Use the defined pageCache strategy
});

// Register a route for navigation requests to use the page cache
// This allows navigation requests to be served from the cache
registerRoute(
  ({ request }) => request.mode === 'navigate', // Match navigation requests
  pageCache // Use the pageCache strategy for these requests
);

// Set up asset caching for images using a separate Cache First strategy
registerRoute(
  ({ request }) => request.destination === 'image', // Match image requests
  new CacheFirst({
    cacheName: 'image-cache', // Name of the cache for images
    plugins: [
      // Plugin to cache responses with specific HTTP status codes
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache responses with status 0 and 200
      }),
      // Plugin to set limits on the number of entries and expiration
      new ExpirationPlugin({
        maxEntries: 60, // Limit the cache to 60 images
        maxAgeSeconds: 30 * 24 * 60 * 60, // Set expiration to 30 days
      }),
    ],
  })
);
