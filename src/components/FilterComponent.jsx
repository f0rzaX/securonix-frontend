import React, { useState, useCallback, useEffect } from 'react';
import MultiSelect from './MultiSelect';
import RangeSelect from './RangeSelect';
import axios from 'axios';

function FilterComponent({ onOkClick }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const [filters, setFilters] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(import.meta.env.VITE_BACKEND_URL + '/' + import.meta.env.VITE_BACKEND_GET_FILTERS_ROUTE, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => setFilters(response.data))
            .catch(error => console.error('Error fetching filters:', error));
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const [filterValues, setFilterValues] = useState({});

    const handleFilterChange = useCallback((key, value) => {
        setFilterValues((prev) => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const handleOkClickInternal = () => {
        toggleDropdown();
        onOkClick(filterValues);
    };


    return (
        <div className="relative w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <div className="flex items-center relative space-x-3 w-full md:w-auto">
                <button
                    id="filterDropdownButton"
                    onClick={toggleDropdown}
                    className="z-20 w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    type="button"
                >
                    Filter
                </button>
                <div
                    id="filterDropdown"
                    className={`absolute z-50 mt-1 w-64 p-3 bg-white right-0 top-full rounded-lg shadow-lg dark:bg-gray-700 ${isDropdownOpen ? 'block' : 'hidden'}`}
                >

                    <div className="flex flex-col items-center justify-center h-full">
                        {Object.entries(filters).map(([key, filter]) => {
                            if (filter.type === 'number') {
                                return (
                                    <RangeSelect
                                        key={key}
                                        label={key}
                                        minValue={filter.min}
                                        maxValue={filter.max}
                                        onChange={(min, max) => handleFilterChange(key, { min, max })}
                                    />
                                );
                            } else if (filter.type === 'string') {
                                return (
                                    <MultiSelect
                                        key={key}
                                        label={key}
                                        options={filter.values}
                                        onChange={(selectedOptions) => handleFilterChange(key, selectedOptions)}
                                    />
                                );
                            }
                            return null;
                        })}
                        <button
                            onClick={handleOkClickInternal}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
                        >
                            OK
                        </button>
                    </div>





                </div>
            </div>
        </div>
    );

}

export default FilterComponent;
