

// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce';
//     const conn = await mongoose.connect(mongoUri);
//     console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
//     return conn;
//   } catch (error) {
//     console.error('MongoDB connection failed.');
//     console.error(`MONGODB_URI: ${process.env.MONGODB_URI || '(not set)'}`);
//     console.error(error);
//     throw error;
//   }
// };

// export default connectDB;



import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecommerce';
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection failed.');
    console.error(`MONGODB_URI: ${process.env.MONGODB_URI || '(not set)'}`);
    console.error(error);
    throw error;
  }
};

export default connectDB;
