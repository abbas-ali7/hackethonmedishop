const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide medicine name'],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Pain Relief',
        'Diabetes',
        'Heart Care',
        'Cold & Cough',
        'Vitamins',
        'Skin Care',
        'Digestive',
        'Other',
      ],
    },
    dosage: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide price'],
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, 'Please provide stock quantity'],
      min: 0,
    },
    sideEffects: [String],
    warnings: [String],
    suitableFor: [String],
    image: {
      type: String,
      default: 'https://via.placeholder.com/300x300?text=Medicine',
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        user: String,
        comment: String,
        rating: Number,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Medicine', MedicineSchema);
