import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/medicines', label: 'Medicines' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b-2 border-green-500"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with 3D effect */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden"
            whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
            <span className="text-white font-bold text-xl relative z-10">Rx</span>
          </motion.div>
          <motion.span
            className="font-bold text-xl text-gray-800 hidden sm:inline bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            MediShop
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.to}
                className="relative text-gray-700 hover:text-green-600 transition font-medium group"
              >
                {item.label}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"
                  layoutId={`underline-${item.to}`}
                />
              </Link>
            </motion.div>
          ))}

          {user?.role === 'admin' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/admin"
                className="relative text-gray-700 hover:text-green-600 transition font-medium group"
              >
                Admin
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"
                />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Cart Icon with animation */}
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-green-600 transition group"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingCart size={24} />
            </motion.div>
            {cart.length > 0 && (
              <motion.span
                className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                {cart.length}
              </motion.span>
            )}
          </Link>

          {/* User Menu */}
          {user ? (
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-xl hover:from-green-200 hover:to-emerald-200 transition shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
                <span className="sm:hidden text-sm font-medium">{user.name.split(' ')[0]}</span>
              </motion.button>

              <motion.div
                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 overflow-hidden"
                initial={{ y: -10, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition"
                >
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link
                to="/login"
                className="px-4 py-2 text-green-600 border-2 border-green-600 rounded-xl hover:bg-green-50 transition text-sm font-medium"
              >
                Login
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition text-sm font-medium shadow-lg"
                >
                  Sign Up
                </Link>
              </motion.div>
            </motion.div>
          )}

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 hover:text-green-600"
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-green-50 to-emerald-50 border-t border-green-200 overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-white/50 rounded-lg transition font-medium"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              {user?.role === 'admin' && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 px-4 text-gray-700 hover:text-green-600 hover:bg-white/50 rounded-lg transition font-medium"
                  >
                    Admin Dashboard
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
