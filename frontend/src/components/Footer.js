import React from 'react';
import { Heart, Award, TrendingUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-green-400">MediShop</h3>
            <p className="text-gray-400 text-sm">
              Your trusted online pharmacy for quality medicines delivered safely to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-green-400">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-green-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Contact</a></li>
              <li><a href="#" className="hover:text-green-400 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Blog</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-green-400">Policies</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-green-400 transition">Privacy</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Terms</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Shipping</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Returns</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-green-400">Contact</h3>
            <p className="text-gray-400 text-sm mb-2">Email: abasalisshaikh@gmail.com</p>
            <p className="text-gray-400 text-sm mb-4">Phone: +91-901800-MEDICINE</p>
            <div className="flex gap-3">
              <a href="#" className="bg-green-600 p-2 rounded hover:bg-green-700 transition">f</a>
              <a href="#" className="bg-green-600 p-2 rounded hover:bg-green-700 transition">t</a>
              <a href="#" className="bg-green-600 p-2 rounded hover:bg-green-700 transition">in</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-3">
            
            <div>
              <p className="font-semibold">Licensed & Certified</p>
              <p className="text-gray-400 text-sm">ISO certified pharmacy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            
            <div>
              <p className="font-semibold">Fast Delivery</p>
              <p className="text-gray-400 text-sm">24-48 hours delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            
            <div>
              <p className="font-semibold">100% Safe</p>
              <p className="text-gray-400 text-sm">Secure transactions</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400 text-sm">
          <p>© 2024 MediShop. All rights reserved – Abbasali Shaikh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
