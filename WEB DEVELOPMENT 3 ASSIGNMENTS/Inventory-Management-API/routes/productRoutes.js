import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  adjustStock,
  deleteProduct,
  getLowStockReport,
  getCategorySummary,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/low-stock', getLowStockReport);
router.get('/summary', getCategorySummary);

router.route('/').post(createProduct).get(getAllProducts);

router
  .route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.patch('/:id/stock', adjustStock);

export default router;