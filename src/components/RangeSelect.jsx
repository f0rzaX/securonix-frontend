import React, { useState, useEffect } from 'react';
const RangeSelect = ({ label, minValue, maxValue, onChange }) => {
    const [min, setMin] = useState(minValue);
    const [max, setMax] = useState(maxValue);

    useEffect(() => {
        onChange(min, max);
    }, [min, max, onChange]);

    const handleMinChange = (e) => {
        setMin(e.target.value);
    };

    const handleMaxChange = (e) => {
        setMax(e.target.value);
    };


    return (
        <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-white">{label} Range</label>
            <div className="flex space-x-4">
                <input
                    type="number"
                    placeholder="Min"
                    value={min}
                    onChange={handleMinChange}
                    className="w-24 px-3 py-2 border border-gray-300 text-xs rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300"
                />
                <input
                    type="number"
                    placeholder="Max"
                    value={max}
                    onChange={handleMaxChange}
                    className="w-24 px-3 py-2 border border-gray-300 text-xs rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300"
                />
            </div>
        </div>
    );
};

export default RangeSelect;
