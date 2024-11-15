"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }
  }, []);

  const onCreateAccount = () => {
    setLoader(true);
    GlobalApi.registerUser(username, email, password).then(
      (resp) => {
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
        toast("Account Created Successfully");
        router.push("/");
        setLoader(false);
      },
      (e) => {
        toast(e?.response?.data?.error?.message || "Registration failed");
        setLoader(false);
      }
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-100">
      <header className="bg-green-700 py-6 text-white text-center">
        <Image
          src="/assets/imgs/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="mx-auto"
        />
        <h1 className="text-3xl font-bold">Create Your Account</h1>
        <p className="mt-2 text-lg">
          Join us and enjoy a fresh grocery experience!
        </p>
      </header>

      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-3xl mx-4 md:mx-auto">
          <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
            Sign Up for Fresh Deals
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onCreateAccount();
            }}
            className="space-y-6"
          >
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-150"
            >
              Create Account
            </button>
            <Link
              href="/sign-in"
              className="flex items-center text-center text-green-700 py-1"
            >
              Already have an account? Login
              <span className="text-blue-400">&nbsp; here</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
