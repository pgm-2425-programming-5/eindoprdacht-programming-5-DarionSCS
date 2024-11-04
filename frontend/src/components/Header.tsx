"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutGrid, ShoppingCart, User, Search, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
          <h1 className="text-lg sm:text-xl font-bold hover:text-green-400 transition duration-300">
            Online Groceries
          </h1>
        </div>

        {/* Hamburger menu for small screens */}
        <button
          className="block sm:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <Menu className="h-8 w-8" />
        </button>

        {/* Full navigation (visible on larger screens) */}
        <div className="hidden sm:flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto mb-4 sm:mb-0">
          <div className="flex gap-2 items-center border border-green-700 rounded-full p-2 bg-green-600 hover:bg-green-400 hover:shadow-md transition duration-300 w-full sm:w-auto">
            <LayoutGrid className="h-5 w-5" />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="font-semibold">Category</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center justify-center w-full sm:w-72">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2 rounded-full border border-green-600 bg-white text-gray-700 placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Navigation links and buttons (visible on larger screens) */}
        <div className="hidden sm:flex flex-wrap gap-4 items-center justify-center sm:justify-end w-full sm:w-auto">
          <Link
            href="/"
            className="text-base sm:text-lg font-bold hover:text-green-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-base sm:text-lg font-bold hover:text-green-300 transition duration-300"
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="relative text-base sm:text-lg font-bold hover:text-green-300 transition duration-300 flex items-center"
          >
            <ShoppingCart className="h-5 w-5 mr-1" />
            Cart
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
              4
            </span>
          </Link>
          <Link href="/login">
            <button className="flex items-center gap-2 px-3 py-2 sm:px-4 bg-green-600 text-white font-semibold rounded hover:bg-green-500 transition duration-300">
              <User className="h-5 w-5" />
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Collapsible menu for small screens */}
      {menuOpen && (
        <div className="sm:hidden bg-green-800 text-white px-4 py-2">
          <Link
            href="/"
            className="block text-base font-bold py-2 hover:text-green-300 transition duration-300"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href="/products"
            className="block text-base font-bold py-2 hover:text-green-300 transition duration-300"
            onClick={toggleMenu}
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="block text-base font-bold py-2 hover:text-green-300 transition duration-300 flex items-center"
            onClick={toggleMenu}
          >
            <ShoppingCart className="h-5 w-5 mr-1" />
            Cart
          </Link>
          <Link
            href="/login"
            className="block text-base font-bold py-2 hover:text-green-300 transition duration-300 flex items-center"
            onClick={toggleMenu}
          >
            <User className="h-5 w-5 mr-1" />
            Login
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
