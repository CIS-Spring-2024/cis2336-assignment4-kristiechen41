const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse incoming requests with URL-encoded data and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the Frontend directory
app.use(express.static(path.join(__dirname, '../Frontend')));

// Serve the Index Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/HTML/index.html'));
});

// Serve the Order Confirmation Page
app.get('/order-confirmation', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/HTML/order_confirmation.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Serve the Order Page
app.get('/order', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/HTML/order.html'));
});

// Serve the Checkout Page
app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/HTML/checkout.html'));
});

// Handle POST request from the checkout form
app.post('/process-checkout', (req, res) => {
  console.log("Checkout data received:", req.body);  // Log checkout data to the console for debugging
  res.redirect('/order-confirmation');
});

// Handle POST request from the order form with enhanced validation and error handling
app.post('/submit-order', (req, res) => {
    const { item1, item2, item3 } = req.body;

    // Validate input: Ensure all items are positive integers
    const items = [item1, item2, item3];
    if (items.some(item => isNaN(item) || item < 0)) {
        return res.status(400).send("All items must be non-negative numbers.");
    }

    try {
        const total = items.reduce((acc, item) => acc + parseInt(item, 10), 0);
        res.send(`Total: $${total}`);
    } catch (error) {
        console.error("Error calculating total:", error);
        res.status(500).send("Error processing your order.");
    }
});
