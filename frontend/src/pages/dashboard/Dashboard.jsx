import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { MdIncompleteCircle } from "react-icons/md";
import RevenueChart from "./RevenueChart";
import { IoBookOutline } from "react-icons/io5";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: (
              <IoBookOutline className="w-6 h-6" />
            ),
            value: data?.totalBooks || 0,
            label: "Products",
            color: "purple",
          },
          {
            icon: (
              <FaArrowTrendUp className="w-6 h-6" />
            ),
            value: `$${data?.totalSales || 0}`,
            label: "Total Sales",
            color: "green",
          },
          {
            icon: (
              <FaArrowTrendDown className="w-6 h-6" />
            ),
            value: (
              <>
                {data?.trendingBooks || 0}{" "}
                <span className="text-sm text-gray-500">(13%)</span>
              </>
            ),
            label: "Trending Books",
            color: "red",
          },
          {
            icon: <MdIncompleteCircle className="size-6" />,
            value: data?.totalOrders || 0,
            label: "Total Orders",
            color: "blue",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="flex items-center p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300"
          >
            <div
              className={`inline-flex flex-shrink-0 items-center justify-center h-12 w-12 text-${card.color}-600 bg-${card.color}-100 rounded-full mr-4`}
            >
              {card.icon}
            </div>
            <div>
              <span className="block text-xl font-bold text-gray-900">
                {card.value}
              </span>
              <span className="block text-sm text-gray-600">{card.label}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Monthly Orders
            </h3>
          </div>
          <div className="p-6">
            <RevenueChart data={data} />
          </div>
        </div>

        {/* Additional Stats */}
        <div className="space-y-6">
          {[
            {
              icon: (
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path
                    fill="#fff"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              ),
              value: data?.pendingOrders || 2,
              label: "Orders Left",
              color: "yellow",
            },
            {
              icon: (
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              value: data?.websiteVisits || 0,
              label: "Website Visits (Last Day)",
              color: "teal",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="flex items-center p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className={`inline-flex flex-shrink-0 items-center justify-center h-12 w-12 text-${stat.color}-600 bg-${stat.color}-100 rounded-full mr-4`}
              >
                {stat.icon}
              </div>
              <div>
                <span className="block text-xl font-bold text-gray-900">
                  {stat.value}
                </span>
                <span className="block text-sm text-gray-600">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder for Customer Chart */}
      <section className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Customers by Type
          </h3>
        </div>
        <div className="p-6 flex items-center justify-center h-64 bg-gray-50">
          <span className="text-gray-500 text-lg">
            Customer Type Chart (To be implemented)
          </span>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;