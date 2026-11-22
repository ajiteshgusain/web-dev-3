


Inventory and Data Management System APIA RESTful backend API built with Node.js, Express.js, MongoDB, and Mongoose for managing a store or warehouse product catalogue. It supports full CRUD operations, query-string filtering/searching/sorting/pagination, safe stock adjustments, MongoDB aggregation reports, and centralized error handling.Tech StackNode.js — Server-side JavaScript runtime (ES Modules)Express.js — Backend routing and middlewareMongoDB — NoSQL document databaseMongoose — Schema design, field validation, virtual properties, and aggregation pipelinesdotenv — Environment variable managementProject StructureInventory-Management-API/
├── config/
│   └── db.js                  # MongoDB connection setup
├── controllers/
│   └── productController.js   # CRUD, filtering, stock updates & aggregation logic
├── middleware/
│   └── errorMiddleware.js     # 404 handler & centralized error handler
├── models/
│   └── Product.js             # Mongoose schema, validations & virtual stockValue
├── routes/
│   └── productRoutes.js       # Express API route definitions
├── .env                       # Environment variables (PORT, MONGO_URI)
├── package.json               # Project metadata & dependencies
├── README.md                  # Project documentation
└── server.js                  # Application entry point
Setup & Installation1. Install DependenciesNavigate to the project root folder and install the required packages:npm install express mongoose dotenv
2. Configure ES ModulesEnsure your package.json includes "type": "module":{
  "name": "inventory-management-api",
  "version": "1.0.0",
  "type": "module",
  "main": "server.js",
  "dependencies": {
    "dotenv": "^16.0.0",
    "express": "^4.18.0",
    "mongoose": "^8.0.0"
  }
}
3. Configure Environment VariablesCreate a .env file in the root directory:PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/inventory_db
4. Start the ServerMake sure your local MongoDB service (or MongoDB Atlas cluster) is running, then start the server:node server.js
(Or with nodemon if installed globally: nodemon server.js)The API will be available at http://localhost:5000.Product Data SchemaFieldTypeValidation & ConstraintsnameStringRequired, trimmed, 2–100 charactersskuStringRequired, unique, uppercase, trimmed, matches /^[A-Z0-9-]+$/categoryStringRequired, trimmedpriceNumberRequired, minimum 0quantityNumberRequired, minimum 0, default 0reorderLevelNumberRequired, minimum 0, default 5supplierStringRequired, trimmedstockValueVirtualAutomatically computed as price * quantitycreatedAtDateAuto-generated timestampupdatedAtDateAuto-updated timestampAPI Endpoints1. Create a ProductMethod & Path: POST /api/productsRequest Body:{
  "name": "Study Table",
  "sku": "FURN-TB-812",
  "category": "Furniture",
  "price": 3999,
  "quantity": 2,
  "reorderLevel": 4,
  "supplier": "IKEA India"
}
Response (201 Created): Returns the created product document including stockValue and id.2. Get All Products (Filter, Search, Sort & Paginate)Method & Path: GET /api/productsSupported Query Parameters:category — Case-insensitive category filter (e.g., ?category=Furniture)supplier — Case-insensitive supplier filter (e.g., ?supplier=IKEA)search — Search by product name or sku (e.g., ?search=Table)minPrice / maxPrice — Filter by price range (e.g., ?minPrice=500&maxPrice=5000)sort — Sort fields, prefix - for descending (e.g., ?sort=-price,name)page — Page number (default: 1)limit — Items per page (default: 10)Response (200 OK):{
  "total": 12,
  "page": 1,
  "totalPages": 2,
  "count": 10,
  "products": [...]
}
3. Get Single Product by IDMethod & Path: GET /api/products/:idResponse (200 OK): Returns the matching product document.4. Update Product DetailsMethod & Path: PUT /api/products/:idRequest Body:{
  "price": 4299,
  "quantity": 10
}
Response (200 OK): Returns the updated product document with validated fields and recalculated stockValue.5. Adjust Stock Safely (Restock / Sale)Method & Path: PATCH /api/products/:id/stockRequest Body:{
  "change": 10
}
(Use positive values like 10 to restock and negative values like -3 for sales. Deductions exceeding current quantity are rejected with 400 Bad Request.)Response (200 OK):{
  "message": "Stock updated",
  "product": { ... }
}
6. Delete ProductMethod & Path: DELETE /api/products/:idResponse (200 OK):{
  "message": "Product deleted",
  "id": "6a547727f6123427d6e61d7c"
}
7. Low-Stock Alert Report (Aggregation)Method & Path: GET /api/products/low-stockDescription: Uses a MongoDB aggregation pipeline ($match with $expr: { $lte: ['$quantity', '$reorderLevel'] }) to list all products at or below their reorder level.Response (200 OK):{
  "count": 4,
  "lowStockItems": [...]
}
8. Category-Wise Inventory Summary (Aggregation)Method & Path: GET /api/products/summaryDescription: Groups inventory by category to compute totalItems, totalQuantity, totalStockValue, and rounded avgPrice.Response (200 OK):{
  "categories": 5,
  "summary": [
    {
      "_id": "Electronics",
      "totalItems": 4,
      "totalQuantity": 96,
      "totalStockValue": 343904,
      "avgPrice": 5636.5
    }
  ]
}
Error HandlingCentralized middleware in middleware/errorMiddleware.js handles:400 Bad Request: Schema validation errors, duplicate sku entries, invalid MongoDB ObjectId formats, and insufficient stock deductions.404 Not Found: Non-existent product IDs and undefined API routes.500 Internal Server Error: Unhandled server exceptions.