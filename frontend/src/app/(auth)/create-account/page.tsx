"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

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
  }, [router]);

  const onCreateAccount = async () => {
    setLoader(true);

    try {
      // Check if the username is already taken
      const existingUsers = await GlobalApi.checkUsername(username);
      if (existingUsers.length > 0) {
        toast.error("Username is already taken.");
        setLoader(false);
        return;
      }

      // Proceed with registration if username is available
      const resp = await GlobalApi.registerUser(username, email, password);
      sessionStorage.setItem("user", JSON.stringify(resp.data.user));
      sessionStorage.setItem("jwt", resp.data.jwt);
      toast.success("Account Created Successfully!");
      router.push("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || "Registration failed."
      );
    } finally {
      setLoader(false);
    }
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
            {/* Username Input */}
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
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
              className={`w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-150 ${
                loader ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loader}
            >
              {loader ? "Creating Account..." : "Create Account"}
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
