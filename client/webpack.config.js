// Import necessary modules for Webpack configuration
const path = require('path'); // Module for handling file and directory paths
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Plugin to generate HTML files
const WebpackPwaManifest = require('webpack-pwa-manifest'); // Plugin for PWA manifest
const { InjectManifest } = require('workbox-webpack-plugin'); // Plugin for service worker injection
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Uncomment if using CSS extraction

// Webpack configuration function
module.exports = () => {
  return {
    mode: 'development', // Set the mode to development for easier debugging

    // Entry points for the application
    entry: {
      main: './src/js/index.js', // Main entry point for the application
      install: './src/js/install.js' // Entry point for the installation logic
    },

    // Output configuration
    output: {
      filename: '[name].bundle.js', // Output filename pattern based on entry names
      path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
    },

    // Plugins configuration
    plugins: [
      // Generates an HTML file and injects the bundles
      new HtmlWebpackPlugin({
        template: './index.html', // Template for the generated HTML file
        title: 'JATE' // Title of the HTML document
      }),

      // Injects a custom service worker into the application
      new InjectManifest({
        swSrc: './src-sw.js', // Source of the service worker
        swDest: 'src-sw.js', // Destination for the service worker
      }),

      // Creates a manifest.json file for the PWA
      new WebpackPwaManifest({
        fingerprints: false, // Disable fingerprinting for icons
        inject: true, // Inject the manifest into the HTML
        name: 'JATE', // Full name of the application
        short_name: 'JATE', // Short name for the application
        description: 'Just Another Test Editor', // Description of the application
        background_color: '#225ca3', // Background color for the splash screen
        theme_color: '#225ca3', // Theme color for the application
        start_url: './', // Start URL for the application
        publicPath: './', // Public path for the application
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to the icon
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('assets', 'icons'), // Destination for the icons
          },
        ],
      }),
    ],

    // Module rules for processing different file types
    module: {
      rules: [
        {
          test: /\.css$/i, // Regex to match CSS files
          use: ['style-loader', 'css-loader'], // Loaders for CSS files
        },
        {
          test: /\.m?js$/, // Regex to match JavaScript files
          exclude: /node_modules/, // Exclude node_modules directory
          use: {
            loader: 'babel-loader', // Use Babel for transpiling JavaScript
            options: {
              presets: ['@babel/preset-env'], // Presets for Babel
              plugins: [
                '@babel/plugin-proposal-object-rest-spread', // Plugin for object rest/spread
                '@babel/transform-runtime' // Plugin to optimize Babel's helper functions
              ],
            },
          },
        },
      ],
    },
  };
};
