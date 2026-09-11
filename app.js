const express = require("express");

const app = express();
const products = [];
const orders = [];

app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("OrderFlow API is running!");
});

app.get("/health", (req, res) => {
    res.json({
        status: "healthy"
    });
});

app.get("/orders", (req, res) => {
    res.json(orders);
});

app.get("/orders/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const order = orders.find(o => o.id === id);

    if (!order) {
        return res.status(404).json({
            message: "Order not found"
        });
    }

    const product = products.find(p => p.id === order.productId);

    const totalPrice = product.price * order.quantity;

    res.json({
        id: order.id,
        customerName: order.customerName,
        quantity: order.quantity,
        product: product,
        totalPrice: totalPrice
    });
});

app.post("/orders", (req, res) => {
    const productId = parseInt(req.body.productId);

    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const quantity = parseInt(req.body.quantity);
    if (!quantity || quantity <= 0) {
   	return res.status(400).json({
        	message: "Quantity must be greater than 0"
   	 });
    }

    if (!req.body.customerName || !req.body.customerName.trim()) {
    return res.status(400).json({
        message: "Customer name is required"
    });
    }


    const order = {
        id: orders.length + 1,
        productId: productId,
        quantity: req.body.quantity,
        customerName: req.body.customerName
    };

    orders.push(order);

    res.status(201).json({
        message: "Order created successfully",
        order: order
    });
});

app.get("/products", (req, res) => {
    res.json(products);
});

app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

app.post("/products", (req, res) => {
    const product = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price
};

    products.push(product);
    res.status(201).json({
        message: "Product created successfully",
        product: product
    });
});

app.listen(PORT, () => {
    console.log(`OrderFlow server running on port ${PORT}`);
});