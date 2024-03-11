import React, { useState } from 'react';
import axios from 'axios';

const UploadModal = ({ isOpen, onClose, id, host }) => {
    const [visaFile, setVisaFile] = useState(null);
    const [ticketFile, setTicketFile] = useState(null);

    const handleVisaFileChange = (e) => {
        setVisaFile(e.target.files[0]);
    };

    const handleTicketFileChange = (e) => {
        setTicketFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('visa', visaFile);
            formData.append('ticket', ticketFile);
            formData.append('id', id);

            console.log(visaFile,ticketFile,'file')

            const response = await axios.post(`${host}/uploaddoc`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if(response.status === 200){
                alert('Documents uploaded successfully');
                onClose()
            }else{
                alert("Error in uploading document, please try after sometime");
            }
            // Add any additional logic here after successful upload
        } catch (error) {
            console.error('Error uploading documents:', error);
            // Handle error condition
        }
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
            <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
            <div className="bg-white p-6 rounded-lg shadow-md z-10 relative">
                <span className="absolute top-0 right-0 cursor-pointer" onClick={onClose}>&times;</span>
                <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
                <div className="mb-4">
                    <label htmlFor="visa" className="block mb-2">Upload Visa</label>
                    <input type="file" id="visa" onChange={handleVisaFileChange} />
                </div>
                <div className="mb-4">
                    <label htmlFor="ticket" className="block mb-2">Upload Ticket</label>
                    <input type="file" id="ticket" onChange={handleTicketFileChange} />
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleUpload}>Upload</button>
            </div>
        </div>
    );
};

export default UploadModal;
