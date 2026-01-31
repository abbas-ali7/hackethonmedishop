import React, { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

const MedicineCard = ({ medicine, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt animation
  const [springs, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { tension: 300, friction: 20 }
  }));

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    api.start({
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.05,
    });
  };

  const handleMouseLeave = () => {
    api.start({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full"
    >
      <animated.div
        style={{
          transform: springs.rotateX.to(
            (rx, ry, s) => `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`
          ),
          transformStyle: 'preserve-3d',
        }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100"
      >
        {/* Image with 3D effect */}
        <motion.div
          className="w-full h-48 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center overflow-hidden relative"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
          {medicine.image ? (
            <motion.img
              src={medicine.image}
              alt={medicine.name}
              className="w-full h-full object-cover"
              animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <motion.div
              className="text-6xl"
              animate={isHovered ? { rotate: [0, 10, -10, 0], scale: 1.2 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              💊
            </motion.div>
          )}
          {/* Floating particles effect */}
          {isHovered && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-green-400 rounded-full"
                  initial={{ x: '50%', y: '50%', opacity: 0 }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow relative z-10 bg-white">
          {/* Category Badge with animation */}
          <motion.div
            className="mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {medicine.category}
            </span>
          </motion.div>

          {/* Name with stagger animation */}
          <motion.h3
            className="font-bold text-lg text-gray-800 line-clamp-2 mb-2 min-h-[3rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {medicine.name}
          </motion.h3>

          {/* Dosage */}
          {medicine.dosage && (
            <motion.p
              className="text-sm text-gray-600 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {medicine.dosage}
            </motion.p>
          )}

          {/* Manufacturer */}
          {medicine.manufacturer && (
            <motion.p
              className="text-xs text-gray-500 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              By {medicine.manufacturer}
            </motion.p>
          )}

          {/* Rating with animated stars */}
          <motion.div
            className="flex items-center gap-1 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
                >
                  <Star
                    size={14}
                    className={i < Math.round(medicine.rating || 4) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                </motion.div>
              ))}
            </div>
            <span className="text-xs text-gray-600 ml-1">({medicine.rating || 4.5})</span>
          </motion.div>

          {/* Price and Stock */}
          <div className="flex justify-between items-center mb-4 mt-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
            >
              <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ₹{medicine.price}
              </p>
              {medicine.stock > 0 && (
                <motion.p
                  className="text-xs text-green-600 font-semibold"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {medicine.stock} in stock
                </motion.p>
              )}
            </motion.div>
            {medicine.stock === 0 && (
              <motion.p
                className="text-xs text-red-600 font-semibold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Out of stock
              </motion.p>
            )}
          </div>

          {/* Add to Cart Button with 3D effect */}
          <motion.button
            onClick={() => onAddToCart(medicine)}
            disabled={medicine.stock === 0}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl relative overflow-hidden group"
            whileHover={{ scale: medicine.stock > 0 ? 1.02 : 1 }}
            whileTap={{ scale: medicine.stock > 0 ? 0.98 : 1 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
            <ShoppingCart size={18} className="relative z-10" />
            <span className="relative z-10">Add to Cart</span>
          </motion.button>
        </div>
      </animated.div>
    </motion.div>
  );
};

export default MedicineCard;
