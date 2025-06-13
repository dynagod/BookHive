import React, { useState } from "react";
import {
  useGetOrderByEmailQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const [cancellingOrder, setCancellingOrder] = useState(null);

  const {
    data: { data } = {},
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser.email);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const orders = data?.orders || [];

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      try {
        setCancellingOrder(orderId);
        await updateOrderStatus({ orderId, status: "cancelled" });
      } catch (error) {
        console.error("Failed to cancel order:", error);
        alert("Failed to cancel order. Please try again.");
      } finally {
        setCancellingOrder(null);
      }
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64 text-lg">
        Loading orders...
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center h-64 text-lg text-red-600">
        Error getting orders data
      </div>
    );

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
        Your Orders
      </h2>
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No orders found!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={order._id}
              className="grid grid-cols-1 lg:grid-cols-[0.3fr_1.5fr_1fr_1fr] gap-4 items-start border-2 border-gray-200 rounded-lg p-4 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Order Number Badge */}
              <div className="flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white text-sm font-semibold rounded-full">
                  #{index + 1}
                </span>
              </div>

              {/* Order Details */}
              <div className="space-y-2">
                <div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base">
                    Order ID
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm font-mono">
                    {order._id}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Name:</span>
                    <span className="ml-2 text-gray-600">{order.name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="ml-2 text-gray-600">{order.email}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Phone:</span>
                    <span className="ml-2 text-gray-600">{order.phone}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="font-medium text-gray-700 mb-1">
                    Shipping Address:
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country} {order.address.zipcode}
                  </p>
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Products ({order.productIds.length})
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {order.productIds.map((product) => (
                    <div
                      key={product._id}
                      className="bg-gray-50 p-2 rounded border-l-4 border-blue-500"
                    >
                      <p className="font-medium text-sm text-gray-800">
                        {product.title}
                      </p>
                      <p className="text-green-600 font-semibold text-sm">
                        ${product.newPrice}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Price and Actions */}
              <div className="flex flex-col items-end lg:items-center space-y-3">
                <div className="text-right lg:text-center">
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${order.totalPrice}
                  </p>
                </div>
                {order.createdAt && (
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                )}

                {/* Cancel Button - Only show if order is not already cancelled or delivered */}
                {order.status !== "cancelled" &&
                  order.status !== "delivered" && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      disabled={cancellingOrder === order._id}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        cancellingOrder === order._id
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 text-white hover:shadow-md"
                      }`}
                    >
                      {cancellingOrder === order._id
                        ? "Cancelling..."
                        : "Cancel Order"}
                    </button>
                  )}

                {/* Show cancelled message if order is cancelled */}
                {order.status === "cancelled" && (
                  <div className="px-3 py-2 bg-red-100 text-red-800 rounded-lg text-sm font-medium">
                    Order Cancelled
                  </div>
                )}

                {/* Show delivered message if order is delivered */}
                {order.status === "delivered" && (
                  <div className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                    Order Delivered
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;