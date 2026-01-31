import React, { useEffect, useState, useContext } from 'react';
import { ordersAPI } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import Toast from '../components/Toast';
import { Package, Calendar, DollarSign, Truck } from 'lucide-react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await ordersAPI.getAll();
      setOrders(res.data.data);
    } catch (error) {
      setToast({ message: 'Failed to fetch orders', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">No Orders Yet</h1>
          <p className="text-gray-600">You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <p className="text-sm opacity-90">Order ID</p>
                  <p className="font-mono font-bold">{order._id.slice(-8).toUpperCase()}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`inline-block px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Order Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                      <Calendar size={16} /> Ordered on
                    </p>
                    <p className="font-semibold text-gray-800">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                      <DollarSign size={16} /> Total Amount
                    </p>
                    <p className="font-semibold text-lg text-green-600">₹{order.totalPrice.toFixed(2)}</p>
                  </div>
                </div>

                {/* Medicines */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">Medicines</h3>
                  <div className="space-y-3">
                    {order.medicines.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-600 font-semibold mb-2 flex items-center gap-2">
                      <Truck size={16} /> Shipping Address
                    </p>
                    <p className="text-gray-800">
                      {order.shippingAddress.street}, {order.shippingAddress.city}
                    </p>
                    <p className="text-gray-800">
                      {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

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

export default OrdersPage;
