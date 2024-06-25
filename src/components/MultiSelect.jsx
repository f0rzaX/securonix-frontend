import React, { useState, useEffect } from 'react';

const MultiSelect = ({ label, options, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        onChange(selectedOptions);
    }, [selectedOptions, onChange]);

    const handleChange = (e) => {
        const { value, checked } = e.target;
        setSelectedOptions((prev) => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter((option) => option !== value);
            }
        });
    };

    return (
        <div className='mb-2 mt-4'>
            <button
                id="dropdownCheckboxButton"
                onClick={toggleDropdown}
                data-dropdown-toggle="dropdownDefaultCheckbox"
                className="w-48 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center"
                type="button"
            >
                {label}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>

            <div id="dropdownDefaultCheckbox"
                className={`absolute z-10 ${isDropdownOpen ? 'block' : 'hidden'} w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
                <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
                    {options.map((value, index) => (
                        <li key={index}>
                            <div className="flex items-center">
                                <input
                                    id={`checkbox-item-${index}`}
                                    type="checkbox"
                                    value={value}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    onChange={handleChange}
                                    checked={selectedOptions.includes(value)}
                                />
                                <label htmlFor={`checkbox-item-${index}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{value}</label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MultiSelect;
