import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { medicinesAPI } from '../utils/api';
import { CartContext } from '../context/CartContext';
import MedicineCard from '../components/MedicineCard';
import Toast from '../components/Toast';
import { Heart, TrendingUp, Award, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HomePage = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 200]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    fetchFeaturedMedicines();
  }, []);

  const fetchFeaturedMedicines = async () => {
    try {
      const res = await medicinesAPI.getAll({ limit: 8 });
      setMedicines(res.data.data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (medicine) => {
    addToCart(medicine, 1);
    setToast({ message: `${medicine.name} added to cart!`, type: 'success' });
  };

  const categories = [
    { name: 'Pain Relief', icon: '💊', color: 'from-red-500 to-pink-500', hoverColor: 'hover:from-red-600 hover:to-pink-600' },
    { name: 'Diabetes', icon: '🩺', color: 'from-purple-500 to-indigo-500', hoverColor: 'hover:from-purple-600 hover:to-indigo-600' },
    { name: 'Heart Care', icon: '❤️', color: 'from-red-400 to-orange-500', hoverColor: 'hover:from-red-500 hover:to-orange-600' },
    { name: 'Cold & Cough', icon: '🤧', color: 'from-blue-500 to-cyan-500', hoverColor: 'hover:from-blue-600 hover:to-cyan-600' },
    { name: 'Vitamins', icon: '🧪', color: 'from-green-500 to-emerald-500', hoverColor: 'hover:from-green-600 hover:to-emerald-600' },
    { name: 'Skin Care', icon: '✨', color: 'from-pink-500 to-rose-500', hoverColor: 'hover:from-pink-600 hover:to-rose-600' },
    { name: 'Digestive', icon: '🫗', color: 'from-yellow-500 to-orange-500', hoverColor: 'hover:from-yellow-600 hover:to-orange-600' },
    { name: 'Other', icon: '📦', color: 'from-gray-500 to-slate-500', hoverColor: 'hover:from-gray-600 hover:to-slate-600' },
  ];

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
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with 3D parallax */}
      <section className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 text-white py-24 md:py-32 overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{ y: y1 }}
        >
          <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            animate={{
              x: [0, Math.random() * 1000 - 500],
              y: [0, Math.random() * 1000 - 500],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <motion.div
                className="inline-block mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </motion.div>
              <motion.h1
                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Your Health,
                <br />
                <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                  Our Priority
                </span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Get quality medicines delivered safely to your doorstep. Trust, safety, and professionalism in every order.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/medicines"
                    className="inline-block bg-white text-green-600 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition shadow-2xl flex items-center gap-2 group"
                  >
                    Shop Now
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => navigate('/medicines')}
                    className="inline-block bg-green-700/80 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl hover:bg-green-800 transition shadow-2xl border-2 border-white/20"
                  >
                    Browse Categories
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="text-center relative"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <motion.div
                className="text-9xl mb-4 relative"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                💊
              </motion.div>
              <motion.p
                className="text-green-100 text-xl font-semibold"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Safe & Reliable Medicines
              </motion.p>
              {/* Orbiting circles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-white/20 rounded-full"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    width: `${100 + i * 50}%`,
                    height: `${100 + i * 50}%`,
                    left: `${-i * 25}%`,
                    top: `${-i * 25}%`,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges with 3D effect */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Award, title: 'Licensed Pharmacy', desc: 'ISO 9001:2015 Certified' },
              { icon: TrendingUp, title: 'Fast Delivery', desc: '24-48 hours delivery' },
              { icon: Zap, title: '100% Authentic', desc: 'Direct from manufacturers' },
              { icon: Heart, title: 'Safe & Secure', desc: 'Encrypted transactions' },
            ].map((badge, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <badge.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{badge.title}</h3>
                <p className="text-gray-600 text-sm">{badge.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search Section with animated categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Find Your Medicine
            </h2>
            <p className="text-gray-600 text-lg">Browse by category or search for specific medicines</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((cat, index) => (
              <motion.div
                key={cat.name}
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotateY: 10, z: 50 }}
                whileTap={{ scale: 0.95 }}
                className="perspective-1000"
              >
                <Link
                  to={`/medicines?category=${cat.name}`}
                  className={`bg-gradient-to-br ${cat.color} ${cat.hoverColor} text-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 text-center block transform-gpu`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className="text-5xl mb-3"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {cat.icon}
                  </motion.div>
                  <p className="font-bold text-sm md:text-base">{cat.name}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Medicines */}
      <section className="py-16 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Featured Medicines
            </h2>
            <p className="text-gray-600 text-lg">Best sellers and highly rated products</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-lg h-64"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                >
                  <div className="bg-gray-300 h-48 mb-2 rounded-t-lg"></div>
                  <div className="bg-gray-300 h-4 w-3/4 mb-2 mx-4 rounded"></div>
                </motion.div>
              ))}
            </div>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
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

              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/medicines"
                    className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold px-8 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition shadow-xl flex items-center gap-2 mx-auto group"
                  >
                    View All Medicines
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <div className="absolute top-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </motion.div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Need Help?
          </motion.h2>
          <motion.p
            className="text-xl text-green-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Our customer support team is available 24/7 to assist you
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="mailto:support@medishop.com"
              className="inline-block bg-white text-green-600 font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition shadow-2xl"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
