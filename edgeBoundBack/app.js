const express = require('express');
const app = express();

const products = [{
    "name": "Samsung Galaxy",
    "category": "electronics"
}, {
    "name": "Motorola V3",
    "category": "electronics"
}, {
    "name": "Iphone 12",
    "category": "electronics"
}, {
    "name": "Skippy",
    "category": "grocery store"
}];

app.get('/products', (req, res) => {
    const filter = req.query.filter; 
    let filteredProducts = [];

    if (filter) {
        filteredProducts = products.filter(product => product.name.toLowerCase().includes(filter.toLowerCase()));
    } else {
        filteredProducts = products;
    }

    
    const suggestedProducts = [];
    filteredProducts.forEach(product => {
        const categoryProducts = products.filter(p => p.category === product.category && p.name !== product.name);
        suggestedProducts.push(...categoryProducts.slice(0, 2)); 
    });

    res.json({
        foundProducts: filteredProducts,
        suggestedProducts: suggestedProducts
    });
});

const port = 3080;

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
