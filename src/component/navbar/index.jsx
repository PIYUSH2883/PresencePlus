import React from 'react';
import attendence_marker from '../../images/attendence_marker.jpeg';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full  bg-white shadow-md z-50">
            <div className="flex flex-col md:flex-row items-center justify-between h-full px-4">
                {/* Logo */}
                <div className="w-full md:w-auto flex justify-center md:justify-start mb-4 md:mb-0">
                    <img src={attendence_marker} alt="Logo" className="h-10 w-auto rounded-full" />
                </div>

                {/* Links */}
                <div className="flex justify-center gap-5 md:space-x-4 w-full md:w-auto md:justify-end">
                    <Link to="/" className="text-gray-700 hover:text-blue-500 mb-2 md:mb-0 text-center">Home</Link>
                    <Link to="/signup" className="text-gray-700 hover:text-blue-500 mb-2 md:mb-0 text-center">SignUp</Link>
                    <Link to="/signin" className="text-gray-700 hover:text-blue-500 mb-2 md:mb-0 text-center">SignIn</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
