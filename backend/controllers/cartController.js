import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { body, validationResult } from 'express-validator';

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, products: [] });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const addToCart = [
  body('productId').isMongoId().withMessage('Invalid product ID'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { productId, quantity = 1 } = req.body;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }

      let cart = await Cart.findOne({ user: req.user._id });
      
      if (!cart) {
        cart = new Cart({ user: req.user._id, products: [] });
      }

      const existingItemIndex = cart.products.findIndex(
        item => item.product.toString() === productId
      );

      if (existingItemIndex > -1) {
        const newQuantity = cart.products[existingItemIndex].quantity + quantity;
        if (product.stock < newQuantity) {
          return res.status(400).json({ message: 'Insufficient stock' });
        }
        cart.products[existingItemIndex].quantity = newQuantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      await cart.populate('products.product');

      res.json({
        message: 'Item added to cart successfully',
        cart,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];

export const updateCartItem = [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { quantity } = req.body;
      const { productId } = req.params;

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }

      const cart = await Cart.findOne({ user: req.user._id });
      
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const itemIndex = cart.products.findIndex(
        item => item.product.toString() === productId
      );

      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }

      cart.products[itemIndex].quantity = quantity;
      await cart.save();
      await cart.populate('products.product');

      res.json({
        message: 'Cart item updated successfully',
        cart,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
];

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.products = cart.products.filter(
      item => item.product.toString() !== productId
    );

    await cart.save();
    await cart.populate('products.product');

    res.json({
      message: 'Item removed from cart successfully',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
