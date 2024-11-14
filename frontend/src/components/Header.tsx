"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, ShoppingCart, User, Search, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "@/app/_utils/GlobalApi";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <header className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        {/* Logo and main title */}
        <div className="flex items-center gap-3">
          <Image
            src="/assets/imgs/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="w-12 h-12"
          />
          <h1 className="text-lg sm:text-xl font-bold">Online Groceries</h1>
        </div>

        {/* Hamburger menu button for md and smaller screens */}
        <button
          className="block lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>

        {/* Full navigation (visible on larger screens) */}
        <div className="hidden lg:flex items-center gap-4 lg:gap-6 w-full lg:w-auto">
          {/* Category Dropdown */}
          <div className="flex gap-2 items-center border border-green-700 rounded-full p-2 bg-green-600 hover:bg-green-400 hover:shadow-md transition duration-300">
            <LayoutGrid className="h-5 w-5" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="font-semibold">Category</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Fruits</DropdownMenuItem>
                <DropdownMenuItem>Vegetables</DropdownMenuItem>
                <DropdownMenuItem>Dairy</DropdownMenuItem>
                <DropdownMenuItem>Snacks</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Bar */}
          <div className="flex items-center justify-center w-full lg:w-72">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 rounded-full border border-green-600 bg-white text-gray-700 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation links */}
          <Link href="/" className="text-lg font-bold hover:text-green-300">
            Home
          </Link>
          <Link
            href="/products"
            className="text-lg font-bold hover:text-green-300"
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="relative text-lg font-bold hover:text-green-300 flex items-center"
          >
            <ShoppingCart className="h-5 w-5 mr-1" />
            Cart
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
              4
            </span>
          </Link>
          <Link href="/login">
            <button className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-500 transition">
              <User className="h-5 w-5" />
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Collapsible menu) */}
      {menuOpen && (
        <nav className="lg:hidden bg-green-800 text-white px-4 py-2">
          <div className="flex items-center border border-green-700 rounded-full p-2 bg-green-600 hover:bg-green-400 hover:shadow-md transition duration-300 mb-2">
            <LayoutGrid className="h-5 w-5" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="font-semibold">Category</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Fruits</DropdownMenuItem>
                <DropdownMenuItem>Vegetables</DropdownMenuItem>
                <DropdownMenuItem>Dairy</DropdownMenuItem>
                <DropdownMenuItem>Snacks</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>{" "}
          </div>

          {/* Search bar mobile */}
          <div className="mb-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 rounded-full border border-green-600 bg-white text-gray-700 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <Link
            href="/"
            className="block text-lg font-bold py-2 hover:text-green-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="block text-lg font-bold py-2 hover:text-green-300"
            onClick={toggleMenu}
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="block text-lg font-bold py-2 hover:text-green-300 flex items-center"
            onClick={toggleMenu}
          >
            <ShoppingCart className="h-5 w-5 mr-1" />
            Cart
          </Link>
          <Link
            href="/login"
            className="block text-lg font-bold py-2 hover:text-green-300 flex items-center"
            onClick={toggleMenu}
          >
            <User className="h-5 w-5 mr-1" />
            Login
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
