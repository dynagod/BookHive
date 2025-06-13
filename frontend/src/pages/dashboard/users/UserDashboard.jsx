import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useGetOrderByEmailQuery } from "../../../redux/features/orders/ordersApi";
import { Link } from "react-router-dom";
import { FaBagShopping, FaCheck, FaDollarSign, FaRegClock, FaUser, FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import Loading from "../../../components/Loading";

const UserDashboard = () => {
  const { currentUserData } = useAuth();
  const {
    data: { data } = {},
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUserData?.email);
  const orders = data?.orders || [];

  // dashboard statistics
  const totalOrders = orders.length;
  const recentOrders = orders.slice(0, 3);
  const pendingOrders = orders.filter(order => order.status === "pending" || order.status === "processing").length;
  const deliveredOrders = orders.filter(order => order.status === "delivered").length;
  const deliveredOrdersArray = orders.filter(order => order.status === "delivered");
  const totalSpent = deliveredOrdersArray.reduce((sum, order) => sum + order.totalPrice, 0);

  if (isLoading)
    return <Loading />;

  if (isError)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">Error loading dashboard data</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 sm:p-8 text-white mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Welcome back, {currentUserData?.fullName || "User"}! 👋
          </h1>
          <p className="text-blue-100 text-lg">
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalOrders}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FaBagShopping className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalSpent.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FaDollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Pending Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingOrders}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <FaRegClock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">
                  {deliveredOrders}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <FaCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Orders
                </h2>
                <Link
                  to="/orders"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                >
                  View All Orders →
                </Link>
              </div>

              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <FaBagShopping className="w-5 h-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {order.productIds.length} item
                              {order.productIds.length > 1 ? "s" : ""}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
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
                        <span className="text-sm font-semibold text-gray-900">
                          ${order.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FaBagShopping className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No orders yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Start shopping to see your orders here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Profile */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <FaUser className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Profile Information
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Full Name</p>
                  <p className="text-sm text-gray-900">
                    {currentUserData?.fullName || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-sm text-gray-900">
                    {currentUserData?.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Phone</p>
                  <div className="flex items-center">
                    <FaPhone className="w-3 h-3 text-gray-400 mr-2" />
                    <p className="text-sm text-gray-900">
                      {currentUserData?.phone || "Not provided"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Member Since
                  </p>
                  <p className="text-sm text-gray-900">
                    {currentUserData?.createdAt
                      ? new Date(currentUserData.createdAt).toLocaleDateString()
                      : "Recently"}
                  </p>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-green-100 rounded-full mr-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Shipping Address
                </h3>
              </div>
              {currentUserData?.address ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-900">
                    {currentUserData.address.street}
                  </p>
                  <p className="text-sm text-gray-900">
                    {currentUserData.address.city}, {currentUserData.address.state}
                  </p>
                  <p className="text-sm text-gray-900">
                    {currentUserData.address.country} - {currentUserData.address.zipcode}
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No address provided</p>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                    Add Address
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/orders"
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center">
                    <FaBagShopping className="w-4 h-4 text-blue-600 mr-3" />
                    <span className="text-sm font-medium text-blue-700">
                      View All Orders
                    </span>
                  </div>
                  <span className="text-blue-600">→</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center">
                    <FaUser className="w-4 h-4 text-green-600 mr-3" />
                    <span className="text-sm font-medium text-green-700">
                      Edit Profile
                    </span>
                  </div>
                  <span className="text-green-600">→</span>
                </Link>
                <Link
                  to="/shop"
                  className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <div className="flex items-center">
                    <FaBagShopping className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-sm font-medium text-purple-700">
                      Continue Shopping
                    </span>
                  </div>
                  <span className="text-purple-600">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;