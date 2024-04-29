const express = require('express');
const cors = require('cors');
const config = require('./config')
const fs = require('fs');
const app = express();
const PORT = config.API_SERVER_PORT;

// Use CORS with default settings which allow all origins
app.use(cors());

// Middleware to handle json data
app.use(express.json());

// Base URL for prepending to images
const baseUrl = `http://localhost:${PORT}/`;

// Configure static files middleware
app.use('/images', express.static('images')); // This line ensures that anything accessed under /images will map to the 'images' directory

// Function to prepend the server address to image URLs
function updateImageUrls(products) {
    // Check and process the variants or products list
    const productData = products.variants || products?.products;
    if (productData) {
        productData.forEach(product => {
            if (product.pictures && Array.isArray(product.pictures)) {
                product.pictures = product.pictures.map(picture => baseUrl + picture);
            }
        });
    }

    // Check and process availableColors if exists and has thumbnails
    if (products.availableColors && products.availableColors.length > 0) {
        products.availableColors.forEach(color => {
            if (color.thumbnail) {
                color.thumbnail = baseUrl + color.thumbnail;
            }
        });
    }

    return products;
}

// Generic function to read and send product data
function readAndSendProductData(filePath, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err !== null) {
            res.status(500).send('Error reading product data');
            return;
        }
        try {
            let products = JSON.parse(data);
            updateImageUrls(products);
            res.json(products);

        } catch (parseErr) {
            res.status(500).send('Error parsing product data');
        }
    });
}

// Endpoint to get product by id (assumed path)
app.post('/api/product', (req, res) => {
    readAndSendProductData('data/products.json', res);
});

// Endpoint to get list of all products
app.get('/api/products', (req, res) => {
    readAndSendProductData('data/productList.json', res);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});