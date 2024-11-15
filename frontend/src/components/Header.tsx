"use client";
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { toast } from "sonner";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import GlobalApi from "@/app/_utils/GlobalApi";
import { UpdateCartContext } from "@/app/_context/UpdateCartContext";
import { useRouter } from "next/navigation";
import CartItemList from "./CartItemList";
import { Button } from "./ui/button";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [user, setUser] = useState(null);
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const router = useRouter();
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setJwt(sessionStorage.getItem("jwt"));
      const userData = JSON.parse(sessionStorage.getItem("user"));
      setUser(userData);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (jwt) {
      getCartItems();
    }
  }, [updateCart, jwt]);

  useEffect(() => {
    let total = 0;
    console.log("Cart Items:", cartItemList);
    cartItemList.forEach((item) => {
      total += item.quantity * item.pricePerUnit;
    });
    setSubTotal(total.toFixed(2));
    console.log("Subtotal:", subtotal);
  }, [cartItemList]);

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      setCategoryList(res.data.data);
    });
  };

  const getCartItems = async () => {
    if (!jwt) return;

    const user = JSON.parse(sessionStorage.getItem("user"));
    const cartItemList_ = await GlobalApi.getCartItems(user.id, jwt);
    setTotalCartItem(cartItemList_?.length);
    setCartItemList(cartItemList_);
  };

  const onDeleteItem = (documentId) => {
    GlobalApi.deleteCartItem(documentId, jwt).then((resp) => {
      toast("Item removed!");
      getCartItems();
    });
  };
  const onUpdateItem = (documentId, newQuantity) => {
    GlobalApi.updateCartItem(documentId, newQuantity, jwt).then(() => {
      toast.success("Cart updated!");
      getCartItems();
    });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    setMenuOpen(false);
    router.push("/sign-in");
  };

  return (
    <header className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link className="flex items-center gap-3" href="/">
          <Image
            src="/assets/imgs/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="w-12 h-12"
          />
          <h1 className="text-lg sm:text-xl font-bold">Online Groceries</h1>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          className="block lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>

        {/* Desktop Navigation */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex items-center gap-4 lg:gap-6 w-full lg:w-auto`}
        >
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
                {categoryList.map((category) => (
                  <Link
                    key={category.id}
                    href={"/product-category/" + category.name}
                  >
                    <DropdownMenuItem className="flex gap-2 items-center">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                          category?.icon?.url
                        }
                        unoptimized={true}
                        width={30}
                        height={30}
                        alt={category.name}
                      />
                      {category.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
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

          {/* Navigation Links */}
          <Link href="/" className="text-lg font-bold hover:text-green-300">
            Home
          </Link>
          <Link
            href="/products"
            className="text-lg font-bold hover:text-green-300"
          >
            Products
          </Link>

          {/* Cart */}
          <div className="relative text-lg font-bold hover:text-green-300 flex items-center">
            <ShoppingCart className="h-5 w-5 mr-1" />
            <Sheet>
              <SheetTrigger>
                Cart
                <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
                  {totalCartItem}
                </span>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>My Cart</SheetTitle>
                  <SheetDescription>
                    <CartItemList
                      cartItemList={cartItemList}
                      onDeleteItem={onDeleteItem}
                      onUpdateItem={onUpdateItem}
                    />
                  </SheetDescription>
                </SheetHeader>
                <SheetClose asChild>
                  <div className="absolute w-[90%] bottom-6 flex flex-col">
                    <h2 className="text-lg font-bold flex justify-between">
                      Subtotal
                      <span>${subtotal}</span>
                    </h2>
                    <Button
                      disabled={cartItemList.length == 0}
                      onClick={() =>
                        router.push(jwt ? "/checkout" : "/sign-in")
                      }
                    >
                      Checkout
                    </Button>
                  </div>
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>

          {/* User Login/Logout */}
          {user ? (
            <span className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white font-semibold rounded">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-1 bg-green-600 text-white font-semibold rounded cursor-pointer">
                  <User className="h-5 w-5" />
                  {user.username}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                  <DropdownMenuItem>My Orders</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          ) : (
            <Link href="/sign-in">
              <button className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-500 transition">
                <User className="h-5 w-5" />
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
