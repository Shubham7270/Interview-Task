import React, { useState, useEffect } from "react";

export default function Personaldetails({ formData, updateFormData }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (formData.photo) {
      const objectUrl = URL.createObjectURL(formData.photo);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [formData.photo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateFormData({ photo: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="flex w-full p-2">
        <div className="w-full">
          <h1 className="block text-left w-full text-gray-500 text-2xl font-bold mb-6">
            Personal Details
          </h1>
          <form>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700 text-left"
                htmlFor="profile"
              >
                Profile Image
              </label>
              <div className="mt-1 flex flex-col items-start">
                <span className="inline-block w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={previewUrl || "https://via.placeholder.com/150"}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                </span>
                <label className="w-50 flex flex-col items-center px-4 py-2 mt-5 bg-blue-300 text-gray-700 rounded-lg shadow-lg cursor-pointer hover:bg-blue-400 hover:text-white">
                  <span className="text-base leading-normal">Upload Image</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <div className="grid gap-x-7 md:grid-cols-2">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                  Gender
                </label>
                <div className="flex space-x-7">
                  {["Male", "Female", "Others"].map((gender) => (
                    <div className="flex items-center" key={gender}>
                      <input
                        type="radio"
                        name="gender"
                        value={gender.toLowerCase()}
                        checked={formData.gender === gender.toLowerCase()}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500"
                      />
                      <label className="ms-2 text-sm font-medium text-gray-900">
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-x-7 md:grid-cols-2">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
