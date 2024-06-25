import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found. Please log in.');
            navigate('/');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/" + import.meta.env.VITE_BACKEND_UPLOAD_ROUTE, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/visualize');
        } catch (error) {
            console.error('File upload failed:', error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-2/3 h-screen mx-auto">
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-600 border-dashed rounded-lg cursor-pointer bg-indigo-600 hover:bg-indigo-500"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-100">
                        {file ? <span className="font-semibold">{file.name}</span> : <span className="font-semibold">Click to upload or drag and drop</span>}
                    </p>
                    {file ? "" : <p className="text-xs text-gray-100">XLS, XLSM, or CSV </p>}

                </div>
                <input id="dropzone-file" type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
            </label>

            <button onClick={handleUpload} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
                Upload File
            </button>

            {loading && (
                <div className="mt-4 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    <span className="ml-2 text-indigo-600">Uploading...</span>
                </div>
            )}
        </div>
    );
};

export default UploadPage;
