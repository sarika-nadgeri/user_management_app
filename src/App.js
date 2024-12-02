import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import AddUser from './pages/AddUser';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen p-4 bg-gradient-to-b from-blue-300 to-blue-900">
        <nav className="mb-4">
          {/* <Link to="/" className="mr-4 text-blue-500 underline">
            User List
          </Link> */}
          {/* <Link to="/add-user" className="text-blue-500 underline">
            Add User
          </Link> */}
        </nav>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/add-user" element={<AddUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
