import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/userSlice';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className='text-white'>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4 text-white">Users</h1>
      <div className="pb-4 flex items-center justify-between relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-2 after:shadow-lg border-b-white border-b-2">
        {/* Left side: Title and Search Bar */}
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="py-2 px-4 outline-slate-400 rounded-full w-full"
          />
        </div>
        {/* Right side: Add User Button */}
        <div className="flex items-center bg-white rounded-full px-4 py-2 ml-4">
          <FaUser className="text-xl text-gray-500" />
          <Link
            to="/add-user"
            className="ml-2 bg-gradient-to-r from-purple-400 to-indigo-900 hover:from-blue-300 hover:to-blue-900 text-transparent bg-clip-text text-md font-bold"
          >
            Add User
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-2/3 mx-auto justify-center mt-5">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Link to={`/user/${user.id}`} key={user.id}>
              <div
                className="cursor-pointer p-4 bg-white shadow-lg shadow-blue-800 rounded transform transition-all duration-700 ease-in-out hover:scale-105 flex flex-col md:flex-row items-center md:items-start"
              >
                {/* Avatar Section */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-purple-300 to-indigo-900 text-white flex items-center justify-center text-xl font-bold mb-4 md:mb-0 md:mr-4">
                  {getInitials(user.name)}
                </div>

                {/* User Info Section */}
                <div className="text-gray-600 md:text-left">
                  <h2 className="text-xl font-bold text-gray-700 pb-2">{user.name}</h2>
                  <p>
                    <span className="text-sm font-semibold">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="text-sm font-semibold">Phone:</span> {user.phone}
                  </p>
                  <p>
                    <span className="text-sm font-semibold">Company:</span> {user.company.name}
                  </p>
                </div>
              </div>

            </Link>
          ))
        ) : (
          <div className="text-center col-span-1 md:col-span-2">
            {/* Image when no results are found */}
            <img 
              src="/images/no_result_found.jpg" 
              alt="No Results Found" 
              className="mx-auto w-1/4 rounded-full" 
            />
            <p className="text-white text-2xl mt-4">No users found matching "{searchTerm}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
