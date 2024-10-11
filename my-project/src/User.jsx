import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000');
                console.log(response.data); // Log the fetched data
                
                // Check if the response data is an array
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    console.error("Expected an array but got:", response.data);
                    setUsers([]); // Set to empty array if data is not valid
                }
            } catch (err) {
                console.error("Error fetching users:", err);
                setError(err); // Set the error state
            } finally {
                setLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:3000/deleteUser/' + id)
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.log(err));
    };

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error loading users: {error.message}</div>;
    }

    return (
        <div className='flex w-full min-h-screen bg-blue-500 justify-center items-center'>
            <div className='bg-white w-full max-w-4xl p-6 rounded-lg shadow-md'>
                <div className="flex justify-between mb-4">
                    <h1 className="text-lg font-bold">User List</h1>
                    <Link to="/create" className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300'>
                        Add +
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-left">Age</th>
                                <th className="px-4 py-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border px-4 py-2">{user.name}</td>
                                        <td className="border px-4 py-2">{user.email}</td>
                                        <td className="border px-4 py-2">{user.age}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <Link to={`/update/${user._id}`} className='px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-300 mr-2'>
                                                Update
                                            </Link>
                                            <button onClick={() => handleDelete(user._id)} className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center border px-4 py-2">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Users;
