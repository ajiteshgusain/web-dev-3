const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON payloads in POST requests
app.use(express.json());

// In-memory array to store products (acts as a temporary database)
let products = [
  { productId: "1", productName: "Laptop", cost: 1200 },
  { productId: "2", productName: "Mouse", cost: 25 }
];

// ==========================================
// 1. GET Request: Retrieve all products
// ==========================================
app.get('/api/products', (req, res) => {
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// ==========================================
// 2. GET Request: Retrieve a product by ID
// ==========================================
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(p => p.productId === productId);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, data: product });
});

// ==========================================
// 3. POST Request: Add a new product
// ==========================================
app.post('/api/products', (req, res) => {
  const { productId, productName, cost } = req.body;

  // Basic validation
  if (!productId || !productName || cost === undefined) {
    return res.status(400).json({ 
      success: false, 
      message: "Please provide productId, productName, and cost." 
    });
  }

  // Check if product ID already exists
  const existingProduct = products.find(p => p.productId === productId);
  if (existingProduct) {
    return res.status(400).json({ 
      success: false, 
      message: "Product with this ID already exists." 
    });
  }

  // Create new product object
  const newProduct = {
    productId,
    productName,
    cost: Number(cost)
  };

  // Add to our array
  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: newProduct
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});