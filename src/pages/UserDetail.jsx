import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/userSlice';
import { FaArrowLeft } from 'react-icons/fa';
import { FaUser, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiOutlinePhone, AiOutlineGlobal } from 'react-icons/ai';

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const user = users.find((user) => user.id === parseInt(id));

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  if (loading) return <p className='text-white'>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="p-4">
       <Link to="/" className="text-white underline mb-4 flex items-center">
            <FaArrowLeft className="mr-2" />
            Back to User List
        </Link>
      <div className="p-4 bg-white shadow rounded-xl mx-auto w-3/5 shadow-lg shadow-blue-800">
        <div className="w-32 h-32 rounded-full bg-gradient-to-b from-purple-300 to-indigo-900 text-white flex items-center justify-center text-4xl font-bold mx-auto mb-4">
          {getInitials(user.name)}
        </div>
        <div className='mx-auto flex justify-center items-center text-md font-semibold text-gray-500'>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-gray-500 pb-4">{user.name}</h1>
            <p><span className='text-sm font-semibold text-gray-400'>Email:</span> {user.email}</p>
            <p><span className='text-sm font-semibold text-gray-400'>Phone:</span> {user.phone}</p>
            <p><span className='text-sm font-semibold text-gray-400'>Company:</span> {user.company.name}</p>
            <p><span className='text-sm font-semibold text-gray-400'>Address:</span> {`${user.address.street}, ${user.address.city}`}</p>
            <p><span className='text-sm font-semibold text-gray-400'>Website:</span> {user.website}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
