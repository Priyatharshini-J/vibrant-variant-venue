/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Link } from "react-router-dom";
import { format, addDays, parse } from "date-fns";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const catalyst = (window as any).catalyst;
    const userManagement = catalyst.userManagement;
    const currentUserPromise = userManagement.getCurrentProjectUser();
    currentUserPromise
      .then((response) => {
        setUserId(response.content.user_id);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://vibrant-variant-venue-routes-handler-10100989956.development.catalystappsail.com/getOrders/" +
            userId
        );
        const rawOrders = response.data.data;
        const structuredOrders = rawOrders.map((entry: any) => {
          const createdTime = entry.CREATEDTIME;
          const address = entry.Address;
          const orderString = entry.Orders;

          // Fix and parse the JSON string
          const fixedJson = orderString
            .replace(/([a-zA-Z0-9_]+)=/g, '"$1":') // id= → "id":
            .replace(/'/g, '"'); // single quotes to double quotes if any

          let items = [];
          try {
            items = JSON.parse(fixedJson);
          } catch (parseError) {
            console.error("JSON parse error:", parseError);
          }

          return { createdTime, items, address };
        });
        console.log("structuredOrders - ", structuredOrders);
        setOrders(structuredOrders);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <LoadingSpinner />;

  if (orders.length === 0)
    return (
      <div className="pt-32 text-center py-12 bg-white rounded-lg shadow">
        <h3 className="pt-32 text-xl text-gray-600">No orders found</h3>
        <Link
          to="/shop"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Start Shopping
        </Link>
      </div>
    );

  return (
    <div className="pt-28 max-w-6xl mx-auto px-4 pb-20">
      <h2 className="text-3xl font-semibold mb-10 text-center">My Orders</h2>

      <div className="space-y-10">
        {orders.map((order) => (
          <div
            key={order.createdTime}
            className="border border-gray-200 shadow-sm rounded-lg p-6"
          >
            {/* Order header */}
            <div className="mb-6 border-b pb-4">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Expected Delivery:</strong>{" "}
                  {new Date(
                    new Date(order.createdTime).getTime() +
                      4 * 24 * 60 * 60 * 1000
                  ).toDateString()}
                  <div className="mt-1">
                    <strong className="text-gray-800">Delivery Address:</strong>{" "}
                    {order.address}
                  </div>
                </div>

                <div className="text-sm text-gray-600 text-right">
                  <strong className="text-gray-800">Order Placed:</strong>{" "}
                  {new Date(order.createdTime).toDateString()}
                </div>
              </div>
            </div>

            {/* Order items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border p-4 rounded items-center"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-28 object-cover rounded-md"
                  />

                  {/* Product Details */}
                  <div className="flex flex-col justify-center gap-1">
                    <h4 className="text-base font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Size: {item.size.toUpperCase()}
                    </p>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      Color:
                      <span
                        className="w-4 h-4 rounded-full border border-gray-400"
                        style={{ backgroundColor: item.color }}
                      ></span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
