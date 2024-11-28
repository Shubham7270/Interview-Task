import React, { useEffect, useState, useCallback } from "react";
import Table from "../component/VTable";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function List() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(
    async (rows = rowsPerPage, page = currentPage) => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${baseURL}/user-list?page=${page}&perPage=${rows}`,
          config
        );
        if (response.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
          setTotalPages(response.data.lastPage || 1);
        } else {
          setError("Invalid data format received from the server");
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        setError("Failed to fetch users. Please try again later.");
        console.error("Fetch Error:", error.response?.data || error.message);
      }
    },
    [rowsPerPage, currentPage]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!isConfirmed) return;
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(`${baseURL}/user-delete/${userId}`, null, config);
      fetchUsers();
    } catch (error) {
      setError("Failed to delete the user. Please try again.");
      console.error("Delete Error:", error.response?.data || error.message);
    }
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    fetchUsers(newRowsPerPage, 1);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    fetchUsers(rowsPerPage, newPage);
  };

  const columns = [
    {
      title: "#",
      key: "srno",
      render: (text, record, index) =>
        (currentPage - 1) * rowsPerPage + index + 1,
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone No", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Action",
      render: (_, record) => (
        <div className="flex gap-1 text-center justify-center">
          <button onClick={() => handleDelete(record.id)}>
            <Trash2 color="#ff0000" size={16} />
          </button>
        </div>
      ),
      key: "action",
      width: 90,
    },
  ];

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
        <h3 className="!text-defaulttextcolor dark:!text-defaulttextcolor/70 text-left text-[1.125rem] font-semibold">
          User List
        </h3>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <div className="flex justify-end mb-3 p-2">
            <Link
              to="/Stepperform"
              className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
            >
              Add
            </Link>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Table
            cols={columns}
            data={users}
            totalPages={totalPages}
            page={currentPage}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
          />
        </div>
      </div>
    </Layout>
  );
}
