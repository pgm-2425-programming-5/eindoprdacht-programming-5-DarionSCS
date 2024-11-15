"use client";
import React, { useState, useEffect } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchCarts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await GlobalApi.getAllProducts();
      setProducts(response.data); // Assuming API returns a 'data' array
    } catch (error) {
      toast.error("Error fetching products.");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await GlobalApi.getUsers(); // Implement getUsers() in GlobalApi
      setUsers(response.data); // Assuming API returns a 'data' array
    } catch (error) {
      toast.error("Error fetching users.");
    }
  };

  const fetchCarts = async () => {
    try {
      const response = await GlobalApi.getAllCarts(); // Implement getAllCarts() in GlobalApi
      setCarts(response.data); // Assuming API returns a 'data' array
    } catch (error) {
      toast.error("Error fetching carts.");
    }
  };

  const updateProduct = async (productId, updatedData) => {
    setLoading(true);
    try {
      await GlobalApi.updateProduct(productId, updatedData); // Implement updateProduct() in GlobalApi
      fetchProducts(); // Reload the products after update
      toast.success("Product updated successfully.");
    } catch (error) {
      toast.error("Error updating product.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      await GlobalApi.deleteProduct(productId); // Implement deleteProduct() in GlobalApi
      fetchProducts(); // Reload the products after deletion
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error("Error deleting product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Admin Panel</h1>

      {/* Products Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <table className="min-w-full table-auto border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.description}</td>
                <td className="py-2 px-4">${product.sellingPrice}</td>
                <td className="py-2 px-4 space-x-2">
                  <Button
                    onClick={
                      () => updateProduct(product.id, { name: "Updated Name" }) // Example for updating
                    }
                    disabled={loading}
                    className="bg-blue-500 text-white"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => deleteProduct(product.id)}
                    disabled={loading}
                    className="bg-red-500 text-white"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <table className="min-w-full table-auto border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  {user.confirmed ? "Confirmed" : "Not Confirmed"}
                </td>
                <td className="py-2 px-4">
                  <Button onClick={() => alert(`Edit user ${user.id}`)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Carts Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Carts</h2>
        <table className="min-w-full table-auto border-collapse text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Total Amount</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart) => (
              <tr key={cart.id} className="border-b">
                <td className="py-2 px-4">{cart.user}</td>
                <td className="py-2 px-4">{cart.quantity}</td>
                <td className="py-2 px-4">${cart.amount}</td>
                <td className="py-2 px-4">
                  <Button onClick={() => alert(`Edit cart ${cart.id}`)}>
                    Edit
                  </Button>
                  <Button
                    onClick={() => alert(`Delete cart ${cart.id}`)}
                    className="bg-red-500 text-white"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
