import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import axios from 'axios';
import { BASE_URL } from '../../helper';

const RecordTypeDistributionChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/dns/distributed`, {
          headers: { Authorization: `${token}` },
          params: { parameter: 'type' }
        });

        if (response.data.success) {
          setChartData(response.data.recordTypeDistribution); // Update to use recordTypeDistribution data
        }
      } catch (error) {
        console.error('Error fetching record type distribution:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container bg-white rounded-lg shadow-md p-4 w-full md:w-70">
      <h2 className="chart-title text-lg font-semibold mb-2">Record Type Distribution</h2>
      <div className="h-48">
        <BarChart
          width={275}
          height={210}
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default RecordTypeDistributionChart;
