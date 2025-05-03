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

  if (isLoading) return <div>Loading orders...</div>;
  if (isError) return <div>Error loading orders</div>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">All Orders</h3>
      <div>
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            {/* Book Icon */}
            <img src={box} alt="" />

            {/* Book Info */}
            <div>
              {order.productIds.map((book) => (
                <div key={book._id} className="mb-2">
                  <p className="font-medium">{book.title}</p>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                </div>
              ))}
              <div className="mt-2">
                <p className="text-sm">City: {order.address?.city}</p>
                <p className="text-sm">Country: {order.address?.country}</p>
              </div>
            </div>

            {/* Order Info */}
            <div>
              <p>Items: {order.productIds.length}</p>
              <p className="mt-2">Phone: {order.phone}</p>
              <p className="mt-1">Payment: COD</p>
              <p className="mt-1">Status: {order.status}</p>
              <p className="mt-1">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Price */}
            <p className="font-semibold text-sm sm:text-[15px]">${order.totalPrice.toFixed(2)}</p>

            {/* Status Dropdown */}
            <select
              className="p-2 font-semibold border border-gray-300 rounded"
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
        ))}
      </div>
    </div>
  );
};

export default AllOrders;