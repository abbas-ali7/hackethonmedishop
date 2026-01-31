import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Toast from '../components/Toast';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [toast, setToast] = React.useState(null);

  const handleCheckout = () => {
    if (!user) {
      setToast({ message: 'Please login to continue', type: 'warning' });
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            🛒
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 text-lg">Add some medicines to get started!</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/medicines"
              className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition font-bold shadow-xl flex items-center gap-2 group"
            >
              Continue Shopping
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: 20,
      opacity: 0,
      transition: { duration: 0.3 },
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
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ShoppingBag className="w-10 h-10 text-green-600" />
          </motion.div>
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={item._id}
                    variants={itemVariants}
                    layout
                    className="flex gap-4 mb-6 pb-6 border-b border-gray-200 last:border-b-0"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    {/* Image */}
                    <motion.div
                      className="w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl">💊</span>
                      )}
                    </motion.div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-1">{item.name}</h3>
                      {item.dosage && <p className="text-sm text-gray-600 mb-2">{item.dosage}</p>}
                      <p className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-4">
                      <motion.div
                        className="flex items-center gap-2 bg-gray-100 rounded-xl p-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus size={18} />
                        </motion.button>
                        <span className="w-10 text-center font-bold text-gray-800">{item.quantity}</span>
                        <motion.button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-200 rounded-lg transition"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus size={18} />
                        </motion.button>
                      </motion.div>

                      {/* Remove Button */}
                      <motion.button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-600 hover:text-red-700 transition flex items-center gap-1 font-semibold"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={18} />
                        <span className="text-sm">Remove</span>
                      </motion.button>

                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Subtotal</p>
                        <p className="font-bold text-lg text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <motion.button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 transition font-semibold mt-4 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 size={18} />
              Clear Cart
            </motion.button>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-20 border border-gray-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></span>
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <motion.div
                className="flex justify-between text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span>Subtotal</span>
                <span className="font-semibold">₹{getTotalPrice().toFixed(2)}</span>
              </motion.div>
              <motion.div
                className="flex justify-between text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span>Shipping</span>
                <span className="text-green-600 font-bold">Free</span>
              </motion.div>
              <motion.div
                className="flex justify-between text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span>Tax (5%)</span>
                <span>₹{(getTotalPrice() * 0.05).toFixed(2)}</span>
              </motion.div>
              <motion.div
                className="border-t-2 border-gray-300 pt-4 flex justify-between text-2xl font-bold"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: 'spring' }}
              >
                <span>Total</span>
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  ₹{(getTotalPrice() * 1.05).toFixed(2)}
                </span>
              </motion.div>
            </div>

            <motion.button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition shadow-xl mb-4 flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Proceed to Checkout
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Link
                to="/medicines"
                className="block text-center text-green-600 hover:text-green-700 transition font-semibold"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

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

export default CartPage;
