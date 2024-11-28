import React, { useEffect, useState, useCallback } from "react";
import Table from "../../component/VTable";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  var baseURL = process.env.REACT_APP_API_BASE_URL;

  const fetchProducts = useCallback(
    async (page = currentPage, limit = rowsPerPage) => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${baseURL}/product-list`, {
          ...config,
          params: { page, perPage: limit },
        });
        setProducts(response.data.data);
        setTotalPages(response.data.lastPage);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      }
    },
    [currentPage, rowsPerPage]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (newRows) => {
    setRowsPerPage(newRows);
    setCurrentPage(1);
  };

  const columns = [
    {
      title: "#",
      key: "srno",
      render: (text, record, index) =>
        index + 1 + (currentPage - 1) * rowsPerPage,
    },
    { title: "Product Name", dataIndex: "name", key: "name" },
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <div className="m-auto flex justify-center">
          <img
            src={
              image.startsWith("http")
                ? image
                : `https://reactinterviewtask.codetentaclestechnologies.tech${image}`
            }
            alt="product"
            width="50"
            height="50"
            className="rounded"
          />
        </div>
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "price", key: "price" },
  ];

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
        <h3 className="text-[1.125rem] font-semibold">Product List</h3>
      </div>
      <div className="bg-white p-4 rounded-lg dark:border-gray-700">
        <div className="flex justify-end mb-3">
          <Link
            to="/Add-product"
            className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800"
          >
            Add Product
          </Link>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Table
          cols={columns}
          data={products}
          totalPages={totalPages}
          page={currentPage}
          handlePageChange={handlePageChange}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    </Layout>
  );
}
