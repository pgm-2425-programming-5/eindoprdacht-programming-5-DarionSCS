"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

function SignIn() {
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

  const onSignIn = (e) => {
    e.preventDefault(); // Prevent form from submitting normally
    setLoader(true);
    GlobalApi.SignIn(email, password).then(
      (resp) => {
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
        toast("Login Successfully");
        router.push("/");
        setLoader(false);
      },
      (e) => {
        toast(e?.response?.data?.error?.message || "Login failed");
        setLoader(false);
      }
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-100">
      <header className="bg-green-700 py-6 text-white text-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="mt-2 text-lg">
          Welcome back! Please sign in to continue.
        </p>
      </header>

      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md mx-4 md:mx-auto">
          <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
            Sign In
          </h2>
          <form onSubmit={onSignIn} className="space-y-6">
            <div>
              <label
                htmlFor="identifier"
                className="block text-gray-700 font-medium mb-1"
              >
                Email or Username
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>

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

            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition duration-150"
            >
              {loader ? <LoaderIcon className="animate-spin" /> : "Sign In"}
            </button>

            <Link
              href="/create-account"
              className="flex items-center text-center text-green-700 py-1"
            >
              Don’t have an account? Create one
              <span className="text-blue-400">&nbsp;here</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
