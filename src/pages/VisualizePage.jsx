import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import FilterComponent from '../components/FilterComponent';
import axios from 'axios';

const VisualizePage = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 0,
        rows_per_page: 0,
        total_pages: 0,
        total_rows: 0
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterValues, setFilterValues] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const fetchData = async ({ page = 1, query = '', filters = {}, sortKey = null, sortDirection = 'ascending' }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/" + import.meta.env.VITE_BACKEND_DATA_ROUTE, { page, query, filters, sortKey, sortDirection }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = response.data;
            setData(data.data);
            setColumns(data.columns.map((column) => ({
                name: column.name,
                display_name: column.name.charAt(0).toUpperCase() + column.name.slice(1).replace('_', ' '),
                type: column.type
            })));
            setPagination({
                current_page: data.pagination.current_page,
                rows_per_page: data.pagination.rows_per_page,
                total_pages: data.pagination.total_pages,
                total_rows: data.pagination.total_rows,
                end_row: data.pagination.end_row
            });
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorMessage('Please upload');
            } else {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
            }
        }
    };


    useEffect(() => {
        fetchData({ page: currentPage, query: searchQuery, filters: filterValues, sortKey: sortConfig.key, sortDirection: sortConfig.direction });
    }, [currentPage, searchQuery, filterValues, sortConfig]);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < pagination.total_pages) {
            setCurrentPage(currentPage + 1);
        }
    };


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleFilterChange = (filters) => {
        setFilterValues(filters);
        setCurrentPage(1);
    };

    const handleClear = () => {
        setSearchQuery('');
        setFilterValues({});
        setCurrentPage(1);
        setSortConfig({ key: null, direction: 'ascending' });
    };

    if (errorMessage) {
        return (
            <>
                <div className="flex justify-center items-center m-4 flex-col mt-56">
                    <div className="p-16 w-1/2 mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-gray-900 dark:text-white">
                            No Excel found, Please Upload one to Visualize it.
                        </h5>
                    </div>
                </div></>
        )
    }

    const handleSort = (columnName, direction) => {
        setSortConfig({ key: columnName, direction });
    };


    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 h-full">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg ">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center mb-4">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M12.293 3.293a1 1 0 010 1.414L8.414 8l3.879 3.879a1 1 0 01-1.414 1.414l-4.586-4.586a1 1 0 010-1.414l4.586-4.586a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="simple-search"
                                            placeholder="Search"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                </form>

                            </div>

                            <div className='flex items-center'>
                                <button
                                    onClick={handleClear}
                                    className="ml-2 mr-4 px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-500 focus:text-blue-600"
                                >
                                    Clear
                                </button>
                                <FilterComponent onOkClick={handleFilterChange} />
                            </div>

                        </div>

                        <DataTable
                            columns={columns}
                            data={data}
                            onSort={handleSort}
                        />

                        <nav aria-label="Table navigation" className="overflow-x-auto">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span className="font-semibold text-gray-900 dark:text-white"> {(pagination.current_page - 1) * pagination.rows_per_page + 1} to {pagination.end_row} </span>
                                of
                                <span className="font-semibold text-gray-900 dark:text-white"> {pagination.total_rows} </span>
                            </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <button
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                        className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M12.293 3.293a1 1 0 010 1.414L8.414 8l3.879 3.879a1 1 0 11-1.414 1.414l-4.586-4.586a1 1 0 010-1.414l4.586-4.586a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </li>
                                {Array.from({ length: pagination.total_pages }, (_, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`px-3 py-2 leading-tight ${currentPage === index + 1 ? 'text-blue-600 bg-blue-50 border border-blue-300' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === pagination.total_pages}
                                        className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M7.707 3.293a1 1 0 00-1.414 1.414L9.586 8l-3.293 3.293a1 1 0 001.414 1.414l4.586-4.586a1 1 0 000-1.414L7.707 3.293z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </nav>

                    </div>
                </div>
            </section>
        </>
    )
};

export default VisualizePage;
