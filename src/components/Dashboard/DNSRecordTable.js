import React from 'react';

const DNSRecordTable = ({ records }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Domain
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              TTL
            </th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.map(record => (
            <tr key={record._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.domain}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.value}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.ttl}</td>
              {/* Render more table data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DNSRecordTable;
