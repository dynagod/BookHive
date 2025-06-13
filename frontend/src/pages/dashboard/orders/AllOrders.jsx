import React from "react";
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "../../../redux/features/orders/ordersApi";
import box from "../../../assets/box.svg";

const AllOrders = () => {
  const { data: { data } = {}, isLoading, isError } = useGetAllOrdersQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();

  const orders = data?.orders || [];

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateStatus({ orderId, status });
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-lg text-gray-600">Loading orders...</div>
    </div>
  );
  
  if (isError) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-lg text-red-600">Error loading orders</div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">All Orders</h3>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {orders.length} Orders
        </div>
      </div>
      
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[auto_2fr_1fr_1fr_1fr] gap-4 p-4 sm:p-6">
              {/* Icon and Order Number */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <img src={box} alt="Order" className="w-8 h-8" />
                </div>
                <span className="text-xs font-medium text-gray-500">#{index + 1}</span>
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800 text-sm mb-2">Products:</h4>
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {order.productIds.map((book) => (
                      <div key={book._id} className="bg-gray-50 p-2 rounded-lg border-l-3 border-blue-500">
                        <p className="font-medium text-sm text-gray-800">{book.title}</p>
                        {book.author && (
                          <p className="text-xs text-gray-600">by {book.author}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <h5 className="font-medium text-gray-700 text-sm mb-1">Shipping Address:</h5>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{order.address?.city}</p>
                    <p>{order.address?.country}</p>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800 text-sm">Order Details:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items:</span>
                    <span className="font-medium text-gray-800">{order.productIds.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium text-gray-800">{order.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment:</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">COD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-800 text-xs">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-center lg:text-left">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-green-600">${order.totalPrice.toFixed(2)}</p>
              </div>

              {/* Status and Actions */}
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Current Status:</p>
                  <div className={`px-3 py-2 rounded-lg text-center text-sm font-medium border ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Update Status:</label>
                  <select
                    className="w-full p-2 text-sm font-medium border border-gray-300 rounded-lg bg-white hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Order ID Footer */}
            <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Order ID:</span>
                <span className="text-xs font-mono text-gray-600 bg-white px-2 py-1 rounded border">{order._id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {orders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <img src={box} alt="No orders" className="w-12 h-12 opacity-50" />
          </div>
          <p className="text-gray-500 text-lg">No orders found</p>
          <p className="text-gray-400 text-sm mt-1">Orders will appear here once customers place them</p>
        </div>
      )}
    </div>
  );
};

export default AllOrders;