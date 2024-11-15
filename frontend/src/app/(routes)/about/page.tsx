"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function AboutPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">About The Project</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Project Description</h2>
        <p className="text-lg mt-2">
          Welcome to our Online Supermarket! This web application allows users
          to register, login, and manage content related to products available
          in the store. The focus is on easy content management for users, and a
          simple way to browse products for visitors. The app includes user
          authentication, product management, and a cart.
        </p>
        <p className="text-lg mt-2">
          Users can add, modify, and remove items from their cart, and can
          browse products categorized in different sections. Admins have full
          access to manage users, categories, and products.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Technical Documentation</h2>
        <h3 className="text-xl font-medium mt-4">Frontend</h3>
        <p className="text-lg mt-2">
          The frontend of this project is built with <strong>Next.js 14</strong>
          , providing a fast, dynamic, and responsive interface. The frontend
          interacts with the backend using REST API calls and displays product
          data, allowing users to interact with the cart and manage their
          profile.
        </p>

        <h3 className="text-xl font-medium mt-4">Backend</h3>
        <p className="text-lg mt-2">
          The backend is powered by <strong>Strapi</strong>, a headless CMS,
          connected to a relational database (e.g., MySQL or PostgreSQL). The
          backend handles user authentication, product management, and cart
          functionalities via REST and GraphQL APIs. All sensitive data such as
          passwords is securely hashed using <strong>bcrypt</strong> and the API
          is protected with
          <strong>JWT</strong> for secure authentication.
        </p>

        <h3 className="text-xl font-medium mt-4">Features</h3>
        <ul className="list-disc pl-6 text-lg">
          <li>Product browsing and categorization</li>
          <li>User registration and authentication</li>
          <li>Adding/removing products from cart</li>
          <li>Admin panel for managing users, categories, and products</li>
          <li>JWT-based authentication for secure access</li>
          <li>Responsive UI with TailwindCSS</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Installation and Usage</h2>
        <h3 className="text-xl font-medium mt-4">Prerequisites</h3>
        <p className="text-lg mt-2">
          To run this project locally, you'll need to have the following tools
          installed:
        </p>
        <ul className="list-disc pl-6 text-lg">
          <li>
            <strong>Node.js</strong> (v16 or higher)
          </li>
          <li>
            <strong>MySQL</strong> or <strong>PostgreSQL</strong> for the
            database
          </li>
          <li>
            <strong>Strapi CMS</strong> for backend
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-4">Steps to Install</h3>
        <ol className="list-decimal pl-6 text-lg">
          <li>Clone the repository from GitHub.</li>
          <li>
            Run <code>npm install</code> to install dependencies for both
            frontend and backend.
          </li>
          <li>
            Set up the database and update the .env file with your database
            credentials.
          </li>
          <li>
            Run <code>npm run dev</code> for the frontend (Next.js) and{" "}
            <code>npm run develop</code> for the backend (Strapi).
          </li>
          <li>
            Open the application in your browser at{" "}
            <code>http://localhost:3000</code>.
          </li>
        </ol>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">API Documentation</h2>
        <h3 className="text-xl font-medium mt-4">Authentication</h3>
        <p className="text-lg mt-2">
          Use <strong>JWT (JSON Web Tokens)</strong> for secure access to the
          API endpoints. To log in, users will need to send a POST request to{" "}
          <code>/auth/local</code> with their credentials (email and password).
          A JWT token will be returned upon successful login and should be used
          for further authenticated requests.
        </p>

        <h3 className="text-xl font-medium mt-4">Product Endpoints</h3>
        <ul className="list-disc pl-6 text-lg">
          <li>
            <strong>GET /products</strong> - Fetch all products
          </li>
          <li>
            <strong>GET /products/id</strong> - Fetch a specific product by ID
          </li>
          <li>
            <strong>POST /products</strong> - Add a new product (Admin only)
          </li>
          <li>
            <strong>PUT /products/id</strong> - Update an existing product
            (Admin only)
          </li>
          <li>
            <strong>DELETE /products/id</strong> - Delete a product (Admin
            only)
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-4">Cart Endpoints</h3>
        <ul className="list-disc pl-6 text-lg">
          <li>
            <strong>GET /carts</strong> - Fetch all carts
          </li>
          <li>
            <strong>POST /carts</strong> - Add a product to the cart
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Security Considerations</h2>
        <p className="text-lg mt-2">
          For securing passwords, strapi uses <strong>bcrypt</strong> to hash
        </p>
      </section>
      <Button className="mt-6 bg-green-500 text-white">Go Back</Button>
    </div>
  );
}

export default AboutPage;
