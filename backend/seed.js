// Seed script to add demo data to MongoDB
// Run with: node seed.js from the backend directory

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Medicine = require('./src/models/Medicine');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB Connected');
  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Medicine.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create demo user
    const demoUser = await User.create({
      name: 'John Doe',
      email: 'user@example.com',
      password: 'password123', // Will be hashed by pre-save hook
      role: 'user',
      phone: '+91 9876543210',
      city: 'Delhi',
    });
    console.log('✓ Created demo user:', demoUser.email);

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      phone: '+91 9876543211',
      city: 'Delhi',
    });
    console.log('✓ Created admin user:', adminUser.email);

    // Sample medicines data
    const medicines = [
      {
        name: 'Aspirin 500mg',
        description: 'Effective pain reliever and anti-inflammatory medication',
        category: 'Pain Relief',
        dosage: '500mg',
        manufacturer: 'PharmaCorp',
        price: 120,
        stock: 150,
        sideEffects: ['Nausea', 'Heartburn', 'Dizziness'],
        warnings: ['Avoid if allergic to aspirin', 'Not for children under 12'],
        suitableFor: ['Headaches', 'Body pain', 'Fever'],
        rating: 4.5,
      },
      {
        name: 'Metformin 500mg',
        description: 'First-line medication for type 2 diabetes management',
        category: 'Diabetes',
        dosage: '500mg',
        manufacturer: 'DiabeteCare',
        price: 350,
        stock: 200,
        sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste'],
        warnings: ['Monitor kidney function', 'Avoid during illness'],
        suitableFor: ['Type 2 Diabetes', 'PCOS'],
        rating: 4.7,
      },
      {
        name: 'Lisinopril 10mg',
        description: 'ACE inhibitor for high blood pressure and heart failure',
        category: 'Heart Care',
        dosage: '10mg',
        manufacturer: 'CardioHealth',
        price: 280,
        stock: 120,
        sideEffects: ['Dry cough', 'Dizziness', 'Fatigue'],
        warnings: ['Check blood pressure regularly', 'Stay hydrated'],
        suitableFor: ['Hypertension', 'Heart failure'],
        rating: 4.6,
      },
      {
        name: 'Cough Syrup Plus',
        description: 'Multi-symptom relief for cough and cold',
        category: 'Cold & Cough',
        dosage: '100ml',
        manufacturer: 'ColdCure',
        price: 180,
        stock: 300,
        sideEffects: ['Drowsiness', 'Dry mouth'],
        warnings: ['Not for children under 2 years', 'May cause drowsiness'],
        suitableFor: ['Cough', 'Cold', 'Sore throat'],
        rating: 4.3,
      },
      {
        name: 'Vitamin C 1000mg',
        description: 'Boosts immunity and overall health',
        category: 'Vitamins',
        dosage: '1000mg',
        manufacturer: 'VitaHealth',
        price: 220,
        stock: 400,
        sideEffects: ['Nausea (rare)', 'Kidney stones (excessive)'],
        warnings: ['Do not exceed recommended dose', 'Consult doctor if pregnant'],
        suitableFor: ['Immune support', 'Antioxidant'],
        rating: 4.8,
      },
      {
        name: 'Moisturizing Cream',
        description: 'Dermatologist-recommended skin moisturizer',
        category: 'Skin Care',
        dosage: '50g',
        manufacturer: 'SkinGlow',
        price: 350,
        stock: 180,
        sideEffects: ['Rare allergic reactions'],
        warnings: ['Test on small area first', 'Avoid eyes'],
        suitableFor: ['Dry skin', 'Sensitive skin'],
        rating: 4.6,
      },
      {
        name: 'Antacid Tablet',
        description: 'Fast-acting relief from acidity and heartburn',
        category: 'Digestive',
        dosage: 'Tablet',
        manufacturer: 'DigestionCare',
        price: 80,
        stock: 500,
        sideEffects: ['Constipation (rare)', 'Bloating'],
        warnings: ['Do not exceed 3 tablets per day', 'Long-term use not recommended'],
        suitableFor: ['Acidity', 'Heartburn', 'Indigestion'],
        rating: 4.4,
      },
      {
        name: 'Allergy Relief',
        description: 'Non-drowsy antihistamine for allergy relief',
        category: 'Other',
        dosage: 'Tablet',
        manufacturer: 'AllergyFree',
        price: 150,
        stock: 250,
        sideEffects: ['Dry mouth', 'Headache (rare)'],
        warnings: ['Avoid if pregnant', 'Do not drive if drowsy'],
        suitableFor: ['Allergies', 'Hay fever', 'Hives'],
        rating: 4.5,
      },
      {
        name: 'Ibuprofen 200mg',
        description: 'Anti-inflammatory pain reliever for mild to moderate pain',
        category: 'Pain Relief',
        dosage: '200mg',
        manufacturer: 'PainRelief Co.',
        price: 100,
        stock: 350,
        sideEffects: ['Stomach upset', 'Dizziness'],
        warnings: ['Take with food', 'Not for children under 10'],
        suitableFor: ['Headaches', 'Body aches', 'Fever', 'Menstrual pain'],
        rating: 4.6,
      },
      {
        name: 'Insulin Pen',
        description: 'Convenient insulin delivery device for diabetes management',
        category: 'Diabetes',
        dosage: 'Pen',
        manufacturer: 'InsulinTech',
        price: 1200,
        stock: 50,
        sideEffects: ['Hypoglycemia', 'Injection site reactions'],
        warnings: ['Requires prescription', 'Proper injection technique essential'],
        suitableFor: ['Type 1 Diabetes', 'Type 2 Diabetes'],
        rating: 4.7,
      },
      {
        name: 'Blood Pressure Monitor',
        description: 'Digital blood pressure monitor for home use',
        category: 'Heart Care',
        dosage: 'Device',
        manufacturer: 'HealthTech',
        price: 1500,
        stock: 75,
        sideEffects: [],
        warnings: ['Calibrate regularly', 'Follow manual instructions'],
        suitableFor: ['Hypertension monitoring', 'Health tracking'],
        rating: 4.8,
      },
      {
        name: 'Multivitamin Tablet',
        description: 'Complete daily vitamin and mineral supplement',
        category: 'Vitamins',
        dosage: 'Tablet',
        manufacturer: 'NutriLife',
        price: 280,
        stock: 320,
        sideEffects: ['Nausea (on empty stomach)'],
        warnings: ['Take with food', 'Do not exceed recommended dose'],
        suitableFor: ['Daily nutrition', 'Energy boost'],
        rating: 4.5,
      },
    ];

    const createdMedicines = await Medicine.insertMany(medicines);
    console.log(`✓ Created ${createdMedicines.length} medicines`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nDemo Credentials:');
    console.log('  Email: user@example.com');
    console.log('  Password: password123');
    console.log('\nAdmin Credentials:');
    console.log('  Email: admin@example.com');
    console.log('  Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run the seeding
connectDB().then(() => {
  seedDatabase();
});
