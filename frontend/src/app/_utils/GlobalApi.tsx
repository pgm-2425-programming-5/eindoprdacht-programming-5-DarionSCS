import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((resp) => {
    return resp.data;
  });

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((resp) => {
    return resp.data;
  });

const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((resp) => {
    return resp.data;
  });

const getProductsByCategory = (category) =>
  axiosClient
    .get("/products?filters[categories][name][$in]=" + category + "&populate=*")
    .then((resp) => {
      return resp.data;
    });

const createProduct = (data, jwt) =>
  axiosClient.post("/products?populate=*", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const updateProduct = (documentId, data, jwt) =>
  axiosClient.put(
    `/products/${documentId}`,
    { data },
    {
      headers: { Authorization: `Bearer ${jwt}` },
    }
  );

const deleteProduct = (productId, jwt) =>
  axiosClient.delete(`/products/${productId}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

// Register User
const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const checkUsername = (username) =>
  axiosClient
    .get(`/users?filters[username][$eq]=${username}`)
    .then((resp) => resp.data);

// Sign In User
const SignIn = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const getAllUsers = (jwt) =>
  axiosClient
    .get("/users", {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .then((resp) => resp.data);

const deleteUser = (userId, jwt) =>
  axiosClient.delete(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });

const getUserProfile = () =>
  axiosClient
    .get("/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
    .then((resp) => resp.data);

const updatePassword = async (
  currentPassword,
  newPassword,
  confirmPassword,
  jwt
) => {
  if (!jwt) throw new Error("Authorization token is missing");

  const response = await axiosClient.post(
    "/auth/change-password",
    {
      currentPassword,
      password: newPassword,
      passwordConfirmation: confirmPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return response.data;
};

const deleteProfile = async (userId, jwt) => {
  if (!jwt || !userId)
    throw new Error("Authorization token or user ID is missing");

  const response = await axiosClient.delete(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return response.data;
};

const addToCart = async (data, jwt) => {
  try {
    const { userId, products } = data.data;
    const productId = products[0]?.id;

    // Fetch existing cart items for the user and product
    const existingCartItems = await axiosClient.get(
      `/user-carts?filters[userId][$eq]=${userId}&filters[products][id][$eq]=${productId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    // Access the correct level in the response
    const existingItem = existingCartItems.data.data[0];

    if (existingItem) {
      // Update only the quantity of the existing item
      const updatedQuantity = existingItem.quantity + data.data.quantity;

      await axiosClient.put(
        `/user-carts/${existingItem.documentId}`, // Use documentId
        {
          data: {
            quantity: updatedQuantity,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } else {
      // Add new item to cart
      await axiosClient.post("/user-carts", data, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    }
  } catch (error) {
    console.error("Error in addToCart:", error.response?.data || error);
    throw error; // Rethrow for the caller to handle
  }
};

const getCartItems = (userId, jwt) =>
  axiosClient
    .get(
      `/user-carts?filters[userId][$eq]=${userId}&populate[products][populate]=images`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;
      const cartItemsList = data.map((item) => ({
        documentId: item.documentId,
        quantity: item.quantity,
        pricePerUnit: item.products[0]?.sellingPrice || item.products[0]?.mrp,
        productDocumentId: item.products[0]?.documentId,
        name: item.products[0]?.name,
        image: item.products[0]?.images[0]?.url,
      }));
      return cartItemsList;
    });

const deleteCartItem = (documentId, jwt) =>
  axiosClient.delete(`/user-carts/${documentId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const updateCartItem = (documentId, quantity, jwt) =>
  axiosClient.put(
    `/user-carts/${documentId}`,
    {
      data: { quantity }, // Only update the quantity
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

const createOrder = (data, jwt) =>
  axiosClient.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getMyOrder = (userId, jwt) =>
  axiosClient
    .get(
      `/orders?filters[userId][$eq]=${userId}&populate[orderItemList][populate][product][populate]=images`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;
      return data.map((order) => ({
        id: order.id,
        totalOrderAmount: order.totalOrderAmount,
        createdAt: order.createdAt,
        orderItemList: order.orderItemList.map((item) => ({
          product: {
            name: item.product.name,
            image: item.product.images[0]?.formats?.small?.url,
            pricePerUnit: item.product.sellingPrice || item.product.mrp,
          },
          quantity: item.quantity,
          price: item.price,
        })),
      }));
    });

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  registerUser,
  SignIn,
  getUserProfile,
  getAllUsers,
  deleteUser,
  addToCart,
  getCartItems,
  deleteCartItem,
  updateCartItem,
  createOrder,
  getMyOrder,
  updatePassword,
  deleteProfile,
  checkUsername,
};
