import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    category: 'Electronics',
    stock: 50,
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking and GPS.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800',
    category: 'Electronics',
    stock: 30,
  },
  {
    name: 'Leather Jacket',
    description: 'Genuine leather jacket with modern fit and premium finish.',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800',
    category: 'Clothing',
    stock: 25,
  },
  {
    name: 'Running Shoes',
    description: 'Professional running shoes with advanced cushioning technology.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    category: 'Sports',
    stock: 40,
  },
  {
    name: 'Coffee Maker',
    description: 'Automatic coffee maker with built-in grinder and milk frother.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
    category: 'Home',
    stock: 20,
  },
  {
    name: 'Yoga Mat',
    description: 'Eco-friendly non-slip yoga mat with carrying strap.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
    category: 'Sports',
    stock: 60,
  },
  {
    name: 'Backpack',
    description: 'Durable waterproof backpack with laptop compartment.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    category: 'Other',
    stock: 35,
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    category: 'Home',
    stock: 45,
  },
];

const seedData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log('Products cleared');

    await Product.insertMany(sampleProducts);
    console.log('Sample products inserted');

    const existingAdmin = await User.findOne({ email: 'admin@shop.com' });
    if (!existingAdmin) {
      const admin = new User({
        name: 'Admin User',
        email: 'admin@shop.com',
        password: 'admin123',
        role: 'admin',
      });
      await admin.save();
      console.log('Admin user created');
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
