import React, { useEffect, useState } from "react";
import Table from "../component/VTable";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import axios from "axios";

export default function List() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://reactinterviewtask.codetentaclestechnologies.tech/api/api/user-list",
          config
        );
        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          setError("Invalid data format received from the server");
        }
      } catch (error) {
        setError("Failed to fetch users.Please try again later");
      }
    };
    fetchUsers();
  }, []);

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
      await axios.post(
        `https://reactinterviewtask.codetentaclestechnologies.tech/api/api/user-delete/${userId}`,
        config
      );
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      setError("Failed to delete User.Please try again");
    }
  };

  const columns = [
    {
      title: "#",
      key: "srno",
      render: (text, record, index) => index + 1,
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
    <>
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

            <Table cols={columns} data={users} />
          </div>
        </div>
      </Layout>
    </>
  );
}
