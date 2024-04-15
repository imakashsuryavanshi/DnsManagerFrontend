import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import axios from 'axios';
import { BASE_URL } from '../../helper';


const DomainDistributionChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE_URL}/dns/distributed`, {
          headers: { Authorization: `${token}` },
          params: {
            parameter : 'domain'
          }
        });
        if(response.success = true)
        {
          const distributionData = response.data.distribution;
          const chartData = distributionData.map(item => ({
            domain: item._id,
            count: item.count
          }));
          setChartData(chartData);
        }
        
      } catch (error) {
        console.error('Error fetching domain distribution:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container bg-white rounded-lg shadow-md p-4 w-70">
      <h2 className="chart-title text-lg font-semibold mb-2">Domain Distribution</h2>
      <div className="h-48">
        <BarChart
           width={275} // Adjust width dynamically based on data length
           height={210}
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="domain" />
          <YAxis />
          <Tooltip formatter={(value, name, props) => [value, props.payload.type]} />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" /> {/* Change the fill color of the bars */}
        </BarChart>
      </div>
    </div>
  );
};

export default DomainDistributionChart;
