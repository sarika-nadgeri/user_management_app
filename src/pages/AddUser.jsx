import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addUser } from '../redux/userSlice';
import { FaUser, FaBuilding, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiOutlinePhone, AiOutlineGlobal } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa';

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    website: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    // Name validation: only alphabets allowed
    if (!formData.name) {
        newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
        newErrors.name = 'Name can only contain letters and spaces';
    }
    // Email validation
    if (!formData.email) {
        newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
    }

    // Phone validation: only digits and specific length
    if (!formData.phone) {
        newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone must be a 10-digit number';
    }
    if (!formData.company) newErrors.company = 'Company is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.website) newErrors.website = 'Website is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(addUser(formData)); // Dispatch the addUser action
    alert('User added successfully!');
    navigate('/'); // Redirect to the User List page
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <div>
        <Link to="/" className="text-white underline mb-4 block flex items-center">
            <FaArrowLeft className="mr-2" />
            Back to User List
        </Link>
        <div className="p-8 w-full max-w-2xl mx-auto min-h-0 bg-white rounded-md shadow-lg">
        <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl font-bold mb-6 text-center bg-gradient-to-r hover:from-blue-300 hover:to-blue-900 from-purple-400 to-indigo-900 text-transparent bg-clip-text">Add New User</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Fields with Icons */}
                {[
                    { name: 'name', type: 'text', placeholder: 'Name', icon: <FaUser /> },
                    { name: 'email', type: 'email', placeholder: 'Email', icon: <MdEmail /> },
                    { name: 'phone', type: 'number', placeholder: 'Phone', icon: <AiOutlinePhone /> },
                    { name: 'company', type: 'text', placeholder: 'Company', icon: <FaBuilding /> },
                    { name: 'address', type: 'text', placeholder: 'Address', icon: <FaMapMarkerAlt /> },
                    { name: 'website', type: 'text', placeholder: 'Website', icon: <AiOutlineGlobal /> },
                ].map(({ name, type, placeholder, icon }) => (
                    <div key={name} className="relative group">
                    <div className="flex items-center p-2 border-b border-gray-300 relative">
                        <div className="text-gray-500 mr-2">{icon}</div>
                        <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full outline-none bg-transparent focus:ring-0"
                        />
                        {/* Gradient Border on Focus */}
                        <div className="absolute left-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-blue-300 to-blue-900 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </div>
                    {errors[name] && <p className="text-red-500">{errors[name]}</p>}
                    </div>
                ))}

                {/* Submit Button */}
                <div className="flex justify-center mt-4">
                    <button
                    type="submit"
                    className="bg-gradient-to-r hover:from-blue-300 hover:to-blue-900 from-purple-400 to-indigo-900 text-white flex items-center justify-center px-6 py-2 rounded-full w-auto"
                    >
                    Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default AddUser;
