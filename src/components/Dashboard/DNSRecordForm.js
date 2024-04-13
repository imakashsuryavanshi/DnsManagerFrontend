import React, { useState, useEffect } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { BASE_URL } from "../../helper";

const DNSManager = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    domain: "",
    type: "A",
    value: "",
    ttl: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [recordIdToEdit, setRecordIdToEdit] = useState(null);
  const [filters, setFilters] = useState({ });

  // Function to retrieve user ID from localStorage
  const getUserId = () => {
    return localStorage.getItem("userId");
  };

  // Function to retrieve token from localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Fetch DNS records from the API based on filters and search query
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = getToken();
        const userId = getUserId(); // Get user ID from localStorage
        const response = await axios.get(`${BASE_URL}/dns/list`, {
          headers: { Authorization: `${token}` },
          params: {
            user : userId
          }
        });
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching DNS records:", error);
      }
    };

    fetchRecords();
  }, [filters]);
  
  useEffect(() => {
    const fetchfilteredRecords = async () => {
      try {
        const token = getToken();
        const userId = getUserId(); 
        const response = await axios.get(`${BASE_URL}/dns/filtered`, {
          headers: { Authorization: `${token}` },
          params: {
            filter: Object.keys(filters)[0], // Ensure filter key matches the parameter expected by the backend
            value: Object.values(filters)[0], // Ensure value key matches the parameter expected by the backend
          },
        });
        if (response.success = true) {
          console.log(response.data.data);
          const filtereddata = response.data.data;
          setRecords(filtereddata);
        }
      } catch (error) {
        console.error("Error fetching DNS records:", error);
      }
    };
  
    fetchfilteredRecords();
  }, [filters]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const user = getUserId(); // Get user ID from localStorage
      if (isEditing) {
        // Update existing record
        await axios.put(
          `${BASE_URL}/dns/update/`,
          { ...formData, user },
          {
            headers: { Authorization: `${token}` },
          }
        );
        setRecords(
          records.map((record) =>
            record._id === recordIdToEdit ? formData : record
          )
        );
        setRecordIdToEdit(null);
        setIsEditing(false);
      } else {
        // Add new record
        const response = await axios.post(
          `${BASE_URL}/dns/create`,
          { ...formData, user },
          {
            headers: { Authorization: `${token}` },
          }
        );
        setRecords([...records, response.data]);
      }
      setFormData({ domain: "", type: "A", value: "", ttl: "" });
    } catch (error) {
      console.error("Error adding/updating DNS record:", error);
    }
  };

  const handleUpdate = (recordId) => {
    const recordToEdit = records.find((record) => record._id === recordId);
    setFormData(recordToEdit);
    setIsEditing(true);
    setRecordIdToEdit(recordId);
  };

  const handleDelete = async (id) => {
    try {
      const token = getToken();
      await axios.delete(`${BASE_URL}/dns/delete/${id}`, 
      {
        headers: { Authorization: `${token}` },
        params: {
          id : id
        }
      }
    );
      setRecords(records.filter((record) => record._id !== id));
    } catch (error) {
      console.error("Error deleting DNS record:", error);
    }
  };

  // Event handler for filtering by domain and record type
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-blue-500">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg flex flex-col">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          DNS Manager
        </h1>

        <form className="flex flex-wrap" onSubmit={handleSubmit}>
          <div className="mb-4 flex-1">
            <label
              htmlFor="domain"
              className="block text-sm font-medium text-gray-700 w-1/4"
            >
              Domain
            </label>
            <input
              type="text"
              id="domain"
              name={"domain"}
              value={formData.domain}
              onChange={handleChange}
              className="w-3/4 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
            />
          </div>
          <div className="mb-4 flex-1">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 w-1/4"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-3/4 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
            >
              <option value="A">A</option>
              <option value="AAAA">AAAA</option>
              <option value="CNAME">CNAME</option>
              <option value="MX">MX</option>
              <option value="NS">NS</option>
              <option value="PTR">PTR</option>
              <option value="SOA">SOA</option>
              <option value="SRV">SRV</option>
              <option value="TXT">TXT</option>
              <option value="DNSSEC">DNSSEC</option>
            </select>
          </div>
          <div className="mb-4 flex-1">
            <label
              htmlFor="value"
              className="block text-sm font-medium text-gray-700 w-1/4"
            >
              Value
            </label>
            <input
              type="text"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="w-3/4 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
            />
          </div>
          <div className="mb-4 flex-1">
            <label
              htmlFor="ttl"
              className="block text-sm font-medium text-gray-700 w-1/4"
            >
              TTL
            </label>
            <input
              type="text"
              id="ttl"
              name="ttl"
              value={formData.ttl}
              onChange={handleChange}
              className="w-3/4 border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 rounded focus:outline-none ${
              isEditing
                ? "bg-green-500 hover:bg-green-700"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-semibold`}
          >
            {isEditing ? "Update DNS Record" : "Add DNS Record"}
          </button>
        </form>

        <div className="mb-4 flex justify-between items-center">
          <div>
            <label htmlFor="domainFilter" className="mr-2 ">
              Filter by Domain:
            </label>
            <input
              id="TTLFilter"
              name="ttl"
              value={filters.domain}
              onChange={handleFilterChange}
              className="bg-gray-200"
            >
            </input>
          </div>
          <div>
            <label htmlFor="typeFilter" className="mr-2">
              Filter by Type:
            </label>
            <select
              id="typeFilter"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="bg-gray-200"
            >
              <option value="">All</option>
              <option value="A">A</option>
              <option value="AAAA">AAAA</option>
              <option value="CNAME">CNAME</option>
              <option value="MX">MX</option>
              <option value="NS">NS</option>
              <option value="PTR">PTR</option>
              <option value="SOA">SOA</option>
              <option value="SRV">SRV</option>
              <option value="TXT">TXT</option>
              <option value="DNSSEC">DNSSEC</option>
            </select>
          </div>
        </div>

        {/* DNS Record Table */}
        <table className="w-full mt-8">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-sm text-gray-600">
                Domain
              </th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">
                Value
              </th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">TTL</th>
              <th className="px-4 py-3 text-left text-sm text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {record.domain}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {record.type}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {record.value}
                </td>
                <td className="px-4 py-3 text-sm text-gray-800">
                  {record.ttl}
                </td>
                <td className="flex items-center">
                  <button
                    onClick={() => handleUpdate(record._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DNSManager;
