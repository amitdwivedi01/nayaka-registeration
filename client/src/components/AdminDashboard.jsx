import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import UploadModal from './UploadModal';

const AdminDashboard = ({host}) => {
    const [users, setUsers] = useState([]);
    const [searchEmail, setSearchEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${host}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSearch = () => {
        if (!searchEmail) {
            fetchUsers();
        } else {
            const filteredUsers = users.filter(user =>
                user.Gmail.toLowerCase().includes(searchEmail.toLowerCase())
            );
            setUsers(filteredUsers);
        }
    };

    const clearSearch = () => {
        setSearchEmail('');
        fetchUsers();
    };

    const exportToExcel = () => {
        // Filter out the ticket and visa fields
        const filteredUsers = users.map(({ ticket, visa, _id, ...rest }) => rest);
    
        const ws = XLSX.utils.json_to_sheet(filteredUsers);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Users');
        XLSX.writeFile(wb, 'users.xlsx');
    };

    const openModal = (userId) => {
        setSelectedUserId(userId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // const uploadDocument = async (documentType) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('documentType', documentType);

    //         const response = await axios.post(`http://localhost:5000/users/${selectedUserId}/documents`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });

    //         if (response.status === 200) {
    //             alert('Document uploaded successfully');
    //             fetchUsers();
    //             setIsModalOpen(false);
    //         }
    //     } catch (error) {
    //         console.error('Error uploading document:', error);
    //     }
    // };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="flex justify-between items-center mb-8">
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Search by Email"
                        className="p-2 border border-gray-300 rounded"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                    />
                    <button onClick={handleSearch} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Search</button>
                    <button onClick={clearSearch} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Clear</button>
                </div>
                <div>
                    <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded">Export to Excel</button>
                </div>
            </div>
            {
                users ? 
            
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">Name</th>
                        <th className="border border-gray-400 px-4 py-2">Email</th>
                        <th className="border border-gray-400 px-4 py-2">Number</th>
                        <th className="border border-gray-400 px-4 py-2">City</th>
                        <th className="border border-gray-400 px-4 py-2">State</th>
                        <th className="border border-gray-400 px-4 py-2">Photo</th>
                        <th className="border border-gray-400 px-4 py-2">aadharfront</th>
                        <th className="border border-gray-400 px-4 py-2">aadharback</th>
                        <th className="border border-gray-400 px-4 py-2">pan</th>
                        <th className="border border-gray-400 px-4 py-2">passport</th>                        
                        <th className="border border-gray-400 px-4 py-2">Ticket</th>
                        <th className="border border-gray-400 px-4 py-2">Visa</th>
                        <th className="border border-gray-400 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="border border-gray-400 px-4 py-2">{`${user.Name} ${user.middleName} ${user.lastName}`}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.Gmail}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.Number}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.city}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.state}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.Photo ? 'A' :"NA"}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.docFront ? 'A': "NA"}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.docBack? "A": "NA"}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.pan ? "A" : "NA"}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.passport ? "A":"NA"}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.ticket ? 'A':'NA'}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.visa ? 'A':'NA'}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button onClick={() => openModal(user._id)} className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            : 
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-[#EC7003] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
              </div>
            }
            <UploadModal
                isOpen={isModalOpen}
                onClose={closeModal}
                id={selectedUserId}
                host={host}
            />
        </div>
    );
};

export default AdminDashboard;
