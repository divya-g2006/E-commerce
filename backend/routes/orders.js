import express from 'express';
import { 
  createOrder, 
  getUserOrders, 
  getAllOrders, 
  updateOrderStatus,
  receiveOrder 
} from '../controllers/orderController.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createOrder);
router.get('/myorders', authenticate, getUserOrders);
router.get('/', authenticate, getUserOrders);
router.put('/receive/:id', authenticate, receiveOrder);
router.get('/all', authenticate, authorizeAdmin, getAllOrders);
router.put('/:id', authenticate, authorizeAdmin, updateOrderStatus);

export default router;
