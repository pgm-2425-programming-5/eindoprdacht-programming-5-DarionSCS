"use client";
import React, { useState, useEffect } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

function AdminPanel() {
  const [jwt, setJwt] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    mrp: "",
    sellingPrice: "",
    itemQuantityType: "",
    category: "",
  });

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
      toast.error("You are not authorized.");
      window.location.href = "/sign-in";
      return;
    }
    setJwt(token);
    fetchProducts(token);
    fetchUsers(token);
    fetchCategories(token);
  }, []);

  const fetchProducts = async (token) => {
    try {
      const productsData = await GlobalApi.getAllProducts(token);
      setProducts(productsData.data);
    } catch (error) {
      toast.error("Failed to fetch products.");
    }
  };

  const fetchUsers = async (token) => {
    try {
      const usersData = await GlobalApi.getAllUsers(token);
      setUsers(usersData);
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
  };

  const fetchCategories = async (token) => {
    try {
      const categoriesData = await GlobalApi.getCategoryList(token);
      setCategories(categoriesData.data);
    } catch (error) {
      toast.error("Failed to fetch categories.");
    }
  };

  const handleAddProduct = async () => {
    try {
      const defaultImageId = 1; // Replace with actual default image ID
      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        mrp: parseFloat(newProduct.mrp),
        sellingPrice: parseFloat(newProduct.sellingPrice),
        itemQuantityType: newProduct.itemQuantityType,
        categories: [{ id: newProduct.category }],
        images: [{ id: defaultImageId }],
      };

      await GlobalApi.createProduct({ data: productData }, jwt);
      toast.success("Product added successfully!");
      fetchProducts(jwt);

      setNewProduct({
        name: "",
        description: "",
        mrp: "",
        sellingPrice: "",
        itemQuantityType: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
      toast.error(
        error.response?.data?.error?.message || "Failed to add product."
      );
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const updatedProductData = {
        ...editingProduct,
        categories: [{ id: editingProduct.category }],
      };

      await GlobalApi.updateProduct(
        editingProduct.documentId,
        { data: updatedProductData },
        jwt
      );
      toast.success("Product updated successfully!");
      fetchProducts(jwt);
      setEditingProduct(null);
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    try {
      await GlobalApi.deleteProduct(productId, jwt);
      toast.success("Product deleted successfully!");
      fetchProducts(jwt);
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  const handleCreateUser = async () => {
    try {
      await GlobalApi.registerUser(
        newUser.username,
        newUser.email,
        newUser.password
      );
      toast.success("User created successfully!");
      fetchUsers(jwt);
      setNewUser({ username: "", email: "", password: "" });
    } catch (error) {
      toast.error("Failed to create user.");
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    try {
      await GlobalApi.deleteUser(userId, jwt);
      toast.success("User deleted successfully!");
      fetchUsers(jwt);
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>

      {/* Manage Products */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Item Quantity Type (e.g., 40g)"
            value={newProduct.itemQuantityType}
            onChange={(e) =>
              setNewProduct({ ...newProduct, itemQuantityType: e.target.value })
            }
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            className="border p-2 rounded col-span-2"
          />
          <input
            type="number"
            placeholder="MRP"
            value={newProduct.mrp}
            onChange={(e) =>
              setNewProduct({ ...newProduct, mrp: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Selling Price"
            value={newProduct.sellingPrice}
            onChange={(e) =>
              setNewProduct({ ...newProduct, sellingPrice: e.target.value })
            }
            className="border p-2 rounded"
          />
          <select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add Product
        </button>

        <table className="w-full mt-6 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">MRP</th>
              <th className="border p-2">Selling Price</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.documentId}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.description}</td>
                <td className="border p-2">${product.mrp}</td>
                <td className="border p-2">${product.sellingPrice}</td>
                <td className="border p-2">
                  {product.categories.map((cat) => cat.name).join(", ")}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.documentId)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manage Users */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleCreateUser}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Add User
        </button>

        <table className="w-full mt-6 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.documentId}>
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
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
