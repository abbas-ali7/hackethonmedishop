const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ⚠️ IMPORTANT: This is a temporary endpoint for seeding the database
// Remove or protect this route after initial deployment
// For production, you should either:
// 1. Remove this route entirely
// 2. Add authentication (admin only)
// 3. Use a one-time secret token

router.post('/seed', async (req, res) => {
  try {
    // Check if database is already seeded
    const existingMedicines = await Medicine.countDocuments();
    if (existingMedicines > 0) {
      return res.status(400).json({
        success: false,
        message: 'Database already contains data. Clear database first if you want to reseed.',
      });
    }

    // Seed Users
    const hashedUserPassword = await bcrypt.hash('password123', 10);
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);

    const users = await User.insertMany([
      {
        name: 'Demo User',
        email: 'user@example.com',
        password: hashedUserPassword,
        role: 'user',
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedAdminPassword,
        role: 'admin',
      },
    ]);

    // Seed Medicines
    const medicines = await Medicine.insertMany([
      {
        name: 'Paracetamol 500mg',
        description: 'Fast-acting pain relief and fever reducer. Suitable for adults and children.',
        price: 25.99,
        stock: 150,
        category: 'Pain Relief',
        manufacturer: 'PharmaCorp',
        expiryDate: new Date('2026-12-31'),
      },
      {
        name: 'Ibuprofen 400mg',
        description: 'Anti-inflammatory pain reliever for headaches, muscle pain, and inflammation.',
        price: 35.50,
        stock: 120,
        category: 'Pain Relief',
        manufacturer: 'MediHealth',
        expiryDate: new Date('2026-11-30'),
      },
      {
        name: 'Amoxicillin 250mg',
        description: 'Antibiotic for bacterial infections. Prescription required.',
        price: 89.99,
        stock: 80,
        category: 'Antibiotics',
        manufacturer: 'BioPharm',
        expiryDate: new Date('2026-10-15'),
      },
      {
        name: 'Vitamin D3 1000IU',
        description: 'Essential vitamin for bone health and immune system support.',
        price: 199.99,
        stock: 200,
        category: 'Vitamins',
        manufacturer: 'NutriLife',
        expiryDate: new Date('2027-06-30'),
      },
      {
        name: 'Cetirizine 10mg',
        description: 'Antihistamine for allergy relief. Non-drowsy formula.',
        price: 45.00,
        stock: 100,
        category: 'Allergy',
        manufacturer: 'AllerMed',
        expiryDate: new Date('2026-09-20'),
      },
      {
        name: 'Omeprazole 20mg',
        description: 'Acid reducer for heartburn and acid reflux relief.',
        price: 125.50,
        stock: 90,
        category: 'Digestive',
        manufacturer: 'GastroPharm',
        expiryDate: new Date('2026-08-25'),
      },
      {
        name: 'Metformin 500mg',
        description: 'Diabetes medication for blood sugar control.',
        price: 150.00,
        stock: 70,
        category: 'Diabetes',
        manufacturer: 'DiabCare',
        expiryDate: new Date('2026-12-10'),
      },
      {
        name: 'Aspirin 75mg',
        description: 'Low-dose aspirin for heart health and blood thinning.',
        price: 29.99,
        stock: 180,
        category: 'Cardiac',
        manufacturer: 'CardioMed',
        expiryDate: new Date('2026-11-15'),
      },
      {
        name: 'Calcium Carbonate 500mg',
        description: 'Calcium supplement for strong bones and teeth.',
        price: 79.99,
        stock: 160,
        category: 'Vitamins',
        manufacturer: 'NutriLife',
        expiryDate: new Date('2027-03-31'),
      },
      {
        name: 'Loratadine 10mg',
        description: '24-hour allergy relief without drowsiness.',
        price: 55.00,
        stock: 110,
        category: 'Allergy',
        manufacturer: 'AllerMed',
        expiryDate: new Date('2026-10-05'),
      },
      {
        name: 'Atorvastatin 20mg',
        description: 'Cholesterol-lowering medication.',
        price: 175.00,
        stock: 60,
        category: 'Cardiac',
        manufacturer: 'CardioMed',
        expiryDate: new Date('2026-09-30'),
      },
      {
        name: 'Multivitamin Complex',
        description: 'Complete daily multivitamin with essential nutrients.',
        price: 249.99,
        stock: 140,
        category: 'Vitamins',
        manufacturer: 'NutriLife',
        expiryDate: new Date('2027-05-20'),
      },
    ]);

    res.status(201).json({
      success: true,
      message: 'Database seeded successfully!',
      data: {
        users: users.length,
        medicines: medicines.length,
      },
      credentials: {
        user: {
          email: 'user@example.com',
          password: 'password123',
        },
        admin: {
          email: 'admin@example.com',
          password: 'admin123',
        },
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({
      success: false,
      message: 'Error seeding database',
      error: error.message,
    });
  }
});

module.exports = router;
