import React, { useState, useEffect, useContext } from 'react';
import { medicinesAPI } from '../utils/api';
import { CartContext } from '../context/CartContext';
import MedicineCard from '../components/MedicineCard';
import Toast from '../components/Toast';
import { Search, Filter, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const MedicinesPage = () => {
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [toast, setToast] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, [search, selectedCategory, minPrice, maxPrice, currentPage]);

  const fetchCategories = async () => {
    try {
      const res = await medicinesAPI.getCategories();
      setCategories(res.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 12,
      };

      if (search) params.search = search;
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await medicinesAPI.getAll(params);
      setMedicines(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      setToast({ message: 'Failed to load medicines', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (medicine) => {
    addToCart(medicine, 1);
    setToast({ message: `${medicine.name} added to cart!`, type: 'success' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with animation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-8 h-8 text-green-600" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Our Medicines
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Browse our complete catalog of medicines and health products</p>
        </motion.div>

        {/* Filters with 3D effect */}
        <motion.div
          className="bg-white rounded-2xl p-6 mb-8 shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <motion.div
              className="flex-1"
              whileFocus={{ scale: 1.02 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <motion.input
                  type="text"
                  placeholder="Search medicines..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  whileFocus={{ borderColor: '#10b981' }}
                />
              </div>
            </motion.div>

            {/* Category */}
            <motion.div
              className="flex-1"
              whileFocus={{ scale: 1.02 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Price Range */}
            <motion.div
              whileFocus={{ scale: 1.02 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">Min Price (₹)</label>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </motion.div>

            <motion.div
              whileFocus={{ scale: 1.02 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price (₹)</label>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white rounded-2xl h-80 shadow-lg overflow-hidden"
              >
                <motion.div
                  className="bg-gradient-to-br from-gray-200 to-gray-300 h-48"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <div className="p-4 space-y-3">
                  <div className="bg-gray-300 h-4 w-3/4 rounded animate-pulse"></div>
                  <div className="bg-gray-300 h-4 w-1/2 rounded animate-pulse"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : medicines.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔍
            </motion.div>
            <p className="text-gray-600 text-xl font-semibold">No medicines found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </motion.div>
        ) : (
          <>
            {/* Medicines Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {medicines.map((medicine, index) => (
                <motion.div
                  key={medicine._id}
                  variants={itemVariants}
                  custom={index}
                >
                  <MedicineCard
                    medicine={medicine}
                    onAddToCart={handleAddToCart}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination with animation */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center items-center gap-2 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-5 py-2 border-2 border-gray-300 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
                  whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
                  whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
                >
                  ← Previous
                </motion.button>

                {[...Array(totalPages)].map((_, i) => (
                  <motion.button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-5 py-2 rounded-xl transition-all font-semibold ${
                      currentPage === i + 1
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                        : 'border-2 border-gray-300 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      scale: currentPage === i + 1 ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {i + 1}
                  </motion.button>
                ))}

                <motion.button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-5 py-2 border-2 border-gray-300 rounded-xl hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
                  whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
                  whileTap={{ scale: currentPage !== totalPages ? 0.95 : 1 }}
                >
                  Next →
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </motion.div>
  );
};

export default MedicinesPage;
