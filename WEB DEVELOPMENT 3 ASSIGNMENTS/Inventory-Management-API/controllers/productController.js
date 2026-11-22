import Product from '../models/Product.js';

// 1. CREATE a new product -> POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// 2. GET all products (with filter, search, sort & pagination) -> GET /api/products
export const getAllProducts = async (req, res, next) => {
  try {
    const query = {};

    // Filter by category or supplier
    if (req.query.category) {
      query.category = { $regex: req.query.category, $options: 'i' };
    }
    if (req.query.supplier) {
      query.supplier = { $regex: req.query.supplier, $options: 'i' };
    }

    // Search by name or SKU
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { sku: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    // Filter by minPrice and/or maxPrice
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // Sort results (default: newest first)
    const sort = req.query.sort ? req.query.sort.split(',').join(' ') : '-createdAt';

    // Pagination setup (page 1, 10 items per page by default)
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort(sort).skip(skip).limit(limit);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      total,
      page,
      totalPages,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// 3. GET single product by ID -> GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// 4. UPDATE product details -> PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// 5. ADJUST stock safely (+ for restock, - for sale) -> PATCH /api/products/:id/stock
export const adjustStock = async (req, res, next) => {
  try {
    const change = Number(req.body.change);

    if (req.body.change === undefined || Number.isNaN(change)) {
      res.status(400);
      throw new Error('Please enter a valid number for change');
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    const newQuantity = product.quantity + change;
    if (newQuantity < 0) {
      res.status(400);
      throw new Error(`Not enough stock. Available quantity is ${product.quantity}`);
    }

    product.quantity = newQuantity;
    await product.save();

    res.status(200).json({
      message: 'Stock updated',
      product,
    });
  } catch (error) {
    next(error);
  }
};

// 6. DELETE product -> DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    res.status(200).json({
      message: 'Product deleted',
      id: product._id,
    });
  } catch (error) {
    next(error);
  }
};

// 7. LOW-STOCK ALERT report (quantity <= reorderLevel) -> GET /api/products/low-stock
export const getLowStockReport = async (req, res, next) => {
  try {
    const lowStockItems = await Product.aggregate([
      {
        $match: {
          $expr: { $lte: ['$quantity', '$reorderLevel'] },
        },
      },
      {
        $addFields: {
          stockValue: { $multiply: ['$price', '$quantity'] },
          id: { $toString: '$_id' },
        },
      },
      {
        $sort: { quantity: 1 },
      },
    ]);

    res.status(200).json({
      count: lowStockItems.length,
      lowStockItems,
    });
  } catch (error) {
    next(error);
  }
};

// 8. CATEGORY-WISE SUMMARY report -> GET /api/products/summary
export const getCategorySummary = async (req, res, next) => {
  try {
    const summary = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          totalItems: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' },
          totalStockValue: { $sum: { $multiply: ['$price', '$quantity'] } },
          avgPrice: { $avg: '$price' },
        },
      },
      {
        $project: {
          _id: 1,
          totalItems: 1,
          totalQuantity: 1,
          totalStockValue: 1,
          avgPrice: { $round: ['$avgPrice', 2] },
        },
      },
      {
        $sort: { totalStockValue: -1 },
      },
    ]);

    res.status(200).json({
      categories: summary.length,
      summary,
    });
  } catch (error) {
    next(error);
  }
};