import os
import time
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PORT = int(os.environ.get("PORT", 3000))
START_TIME = time.time()

# ── In-memory data ────────────────────────────────────────────────────────────
products = [
    {"id": 1, "name": "Laptop", "price": 999.99, "stock": 10, "category": "electronics"},
    {"id": 2, "name": "Mouse", "price": 29.99, "stock": 50, "category": "electronics"},
    {"id": 3, "name": "Desk", "price": 299.99, "stock": 5, "category": "furniture"},
]
next_product_id = 4

orders = [
    {"id": 1, "product_id": 1, "quantity": 2, "status": "delivered"},
    {"id": 2, "product_id": 2, "quantity": 1, "status": "pending"},
]
next_order_id = 3

# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/")
def index():
    return jsonify({
        "service": "python-flask-api-demo",
        "version": "1.0.0",
        "status": "running",
        "runtime": "Python/Flask",
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "endpoints": [
            "GET  /",
            "GET  /health",
            "GET  /api/products",
            "POST /api/products",
            "GET  /api/products/<id>",
            "GET  /api/orders",
            "POST /api/orders",
        ],
    })

@app.get("/health")
def health():
    return jsonify({"status": "ok", "uptime": round(time.time() - START_TIME, 2)})

# Products
@app.get("/api/products")
def get_products():
    category = request.args.get("category")
    result = [p for p in products if p["category"] == category] if category else products
    return jsonify({"products": result, "total": len(result)})

@app.get("/api/products/<int:product_id>")
def get_product(product_id):
    product = next((p for p in products if p["id"] == product_id), None)
    if not product:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product)

@app.post("/api/products")
def create_product():
    global next_product_id
    data = request.get_json()
    if not data or not data.get("name") or not data.get("price"):
        return jsonify({"error": "name and price are required"}), 400
    product = {
        "id": next_product_id,
        "name": data["name"],
        "price": float(data["price"]),
        "stock": int(data.get("stock", 0)),
        "category": data.get("category", "general"),
    }
    next_product_id += 1
    products.append(product)
    return jsonify(product), 201

# Orders
@app.get("/api/orders")
def get_orders():
    return jsonify({"orders": orders, "total": len(orders)})

@app.post("/api/orders")
def create_order():
    global next_order_id
    data = request.get_json()
    if not data or not data.get("product_id") or not data.get("quantity"):
        return jsonify({"error": "product_id and quantity are required"}), 400
    order = {
        "id": next_order_id,
        "product_id": int(data["product_id"]),
        "quantity": int(data["quantity"]),
        "status": "pending",
    }
    next_order_id += 1
    orders.append(order)
    return jsonify(order), 201

# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print(f"🐍 Flask API running on port {PORT}")
    app.run(host="0.0.0.0", port=PORT)
