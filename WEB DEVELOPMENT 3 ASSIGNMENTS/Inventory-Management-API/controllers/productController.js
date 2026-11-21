import Product from '../models/Product.js';

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const queryObj = {};

    if (req.query.category) {
      queryObj.category = { $regex: req.query.category, $options: 'i' };
    }
    if (req.query.supplier) {
      queryObj.supplier = { $regex: req.query.supplier, $options: 'i' };
    }

    if (req.query.search) {
      queryObj.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { sku: { $regex: req.query.search, $options: 'i' } },
      ];
    }

    if (req.query.minPrice || req.query.maxPrice) {
      queryObj.price = {};
      if (req.query.minPrice) queryObj.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) queryObj.price.$lte = Number(req.query.maxPrice);
    }

    let sortBy = '-createdAt';
    if (req.query.sort) {
      sortBy = req.query.sort.split(',').join(' ');
    }

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments(queryObj);
    const products = await Product.find(queryObj)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

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

export const adjustStock = async (req, res, next) => {
  try {
    const { change } = req.body;

    if (typeof change !== 'number' || Number.isNaN(change)) {
      res.status(400);
      throw new Error('Please provide a valid numeric "change" value');
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    if (product.quantity + change < 0) {
      res.status(400);
      throw new Error(
        `Insufficient stock. Current stock is ${product.quantity}, cannot deduct ${Math.abs(change)}`
      );
    }

    product.quantity += change;
    await product.save();

    res.status(200).json({
      message: 'Stock updated',
      product,
    });
  } catch (error) {
    next(error);
  }
};

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

export const getLowStockReport = async (req, res, next) => {
  try {
    const lowStockDocs = await Product.aggregate([
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
      count: lowStockDocs.length,
      lowStockItems: lowStockDocs,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategorySummary = async (req, res, next) => {
  try {
    const summary = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          totalItems: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' },
          totalStockValue: {
            $sum: { $multiply: ['$price', '$quantity'] },
          },
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