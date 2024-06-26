import React, { useState } from 'react';

const DataTable = ({ columns, data, onSort }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const handleSort = (columnName) => {
        let direction = 'ascending';
        if (sortConfig.key === columnName && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key: columnName, direction });
        onSort(columnName, direction);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.name}
                                scope="col"
                                className="px-4 py-3 cursor-pointer"
                                onClick={() => handleSort(col.name)}
                            >
                                {col.display_name}
                                {sortConfig.key === col.name ? (
                                    sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
                                ) : null}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b dark:border-gray-700">
                            {columns.map((col) => (
                                <td key={col.name} className="px-4 py-3">
                                    {col.type === 'boolean' ? (row[col.name] ? 'Yes' : 'No') : row[col.name]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
