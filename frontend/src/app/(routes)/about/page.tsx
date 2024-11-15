"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Documentation</h1>
        <p className="text-lg text-gray-600 mt-2">
          Everything you need to know about this project
        </p>
      </header>

      {/* Overview Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed">
          I made a grocery store app using Next.js as my frontend and Strapi as
          backend. This project is a simple grocery store app where users can
          view products, add them to the cart, and place an order. The app also
          has a category page where users can view products based on categories.
        </p>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>
            Registration and login, when logged in you can also change your
            password and delete your account
          </li>
          <li>Users can add and manage content in their cart</li>
          <li>You can only manage a cart if you are logged in</li>
          <li>
            You can go to the working checkout page and use PayPal as a payment
            method (theres also a test button)
          </li>
          <li>
            There is an admin page where admins can manage users and product
            data (CRUD)
          </li>
          <li>Use of JWT tokens to remember you are logged in</li>
        </ul>
      </section>

      {/* Getting Started Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Getting Started
        </h2>
        <ol className="list-decimal pl-5 text-gray-700">
          <li>"npm i" in the frontend folder and then "npm run dev"</li>
          <li>"npm run develop" in the backend folder to start strapi</li>
          <li>
            your ip adress must be put in "next.config.mjs" and .env.local if
            you are hosting locally
          </li>
        </ol>
      </section>
    </div>
  );
}

export default AboutPage;
