import React from "react";
import { useNavigate } from "react-router-dom";
import DNSRecordForm from "../components/Dashboard/DNSRecordForm";
import DomainDistributionChart from "../components/Charts/DomainDistributionChart";
import RecordTypeDistributionChart from "../components/Charts/RecordTypeDistributionChart";
import BulkUploadForm from "../components/BulkUploadForm"; // Import the BulkUploadForm component

const Dashboard = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 flex flex-col h-full">
      <div className="flex justify-between items-center px-4 py-2">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>

      <div className="flex flex-grow flex-wrap">
        {/* DNS Record Form (Full width on mobile, 50% width on larger screens) */}
        <div className="w-full sm:w-1/2 px-4 overflow-x-auto" >
          <DNSRecordForm />
        </div>

        {/* Charts and Bulk Upload (Full width on mobile, 50% width on larger screens) */}
        <div className="w-full sm:w-1/2 px-4 flex flex-col">
          {/* Charts (75% height on larger screens) */}
          <div className="flex flex-grow flex-wrap">
            <div className="w-full sm:w-1/2 px-2">
              <DomainDistributionChart />
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <RecordTypeDistributionChart />
            </div>
          </div>

          {/* Bulk Upload Form (25% height on larger screens) */}
          <div className="w-full sm:h-2/4 mt-4">
            <BulkUploadForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
