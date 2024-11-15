"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import GlobalApi from "@/app/_utils/GlobalApi";

function Profile() {
  const [jwt, setJwt] = useState(null);
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("jwt");
      const userData = JSON.parse(sessionStorage.getItem("user"));

      if (!token) {
        window.location.href = "/sign-in";
      }

      setJwt(token);
      setUser(userData);
    }
  }, []);

  const handleUpdatePassword = async () => {
    if (!jwt || !user) return;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await GlobalApi.updatePassword(
        currentPassword,
        newPassword,
        confirmPassword,
        jwt
      );
      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || "Failed to update password."
      );
    }
  };

  const handleDeleteProfile = async () => {
    if (!jwt || !user) return;

    const confirm = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (!confirm) return;

    try {
      await GlobalApi.deleteProfile(user.id, jwt);
      toast.success("Account deleted successfully.");
      sessionStorage.clear();
      window.location.href = "/sign-in";
    } catch (error) {
      toast.error(
        error?.response?.data?.error?.message || "Failed to delete account."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-6 max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Profile Settings for{" "}
          <span className="text-blue-500">{user?.username}</span>
        </h2>

        <div>
          <h3 className="text-lg font-semibold mb-4">Update Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Current Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleUpdatePassword}
            className="w-full bg-green-700 text-white font-medium rounded-md py-2 mt-4 hover:bg-green-600"
          >
            Update Password
          </button>
        </div>

        <hr className="my-6" />

        <div>
          <h3 className="text-lg font-semibold mb-4">Danger Zone</h3>
          <button
            onClick={handleDeleteProfile}
            className="w-full bg-red-700 text-white font-medium rounded-md py-2 hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
