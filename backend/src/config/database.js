const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`✗ Error connecting to MongoDB:`, error.message);
    console.error(`⚠️  Running without database. Database features will be unavailable.`);
    // Don't exit - allow server to continue running without database
  }
};

module.exports = connectDB;
