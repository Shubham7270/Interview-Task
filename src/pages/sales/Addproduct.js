import React, { useState } from "react";
import Layout from "../../component/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;
export default function Addproduct() {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    image: null,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.productName);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("image", formData.image);

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios.post(`${baseURL}/add-product`, formDataToSend, config);

      alert("Product added successfully!");
      navigate("/Product");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
        <h3 className="text-[1.125rem] font-semibold">Add Product</h3>
      </div>
      <div className="bg-white p-4 rounded-lg dark:border-gray-700">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
              Product Name
            </label>
            <input
              className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="productName"
              type="text"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Product Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
              Product Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG, or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
              Description
            </label>
            <textarea
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
              Price
            </label>
            <input
              className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />
          </div>
          <div className="flex justify-between">
            <Link
              to="/Product"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Back
            </Link>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
