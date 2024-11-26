import React, { useState } from "react";

export default function CredentialDetails({ formData, updateFormData }) {
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });

    if (name === "confirmPassword" && value !== formData.password) {
      setPasswordError("Passwords do not match");
    } else if (name === "confirmPassword") {
      setPasswordError("");
    }
  };

  return (
    <>
      <div className="flex w-full p-2">
        <div className="w-full">
          <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
            Credential Details
          </h1>
          <form>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700 text-left"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-left text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-left text-gray-700"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword || ""}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />

                {passwordError && (
                  <p className="text-red-500 text-xs italic mt-2">
                    {passwordError}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
