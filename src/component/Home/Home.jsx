import React from 'react';
import { Link } from 'react-router-dom';
import attendence_marker from '../../images/attendence_marker.jpeg'; // Make sure this path is correct

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-gray-800">
            {/* <header className="w-full bg-blue-800 text-white py-4">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center">
                        <img src={attendence_marker} alt="Logo" className="h-12 w-auto mr-4" />
                        <h1 className="text-3xl font-bold">PresencePlus</h1>
                    </div>
                    <nav className="space-x-4">
                        <Link to="/signup" className="text-white hover:text-blue-300">Sign Up</Link>
                        <Link to="/signin" className="text-white hover:text-blue-300">Sign In</Link>
                    </nav>
                </div>
            </header> */}
            <div className="flex flex-col items-center justify-center flex-grow py-12">
                <h1 className='font-extrabold text-left text-2xl my-3'>Welcome To PresencePlus</h1>
                <p className="text-lg mb-6 text-left sm:text-center max-w-lg">
                Manage student attendance effortlessly with our easy-to-use platform. Whether you're tracking daily attendance or managing class schedules, PresencePlus has got you covered.
                </p>
                <Link to="/signup">
                    <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                        Get Started
                    </button>
                </Link>
            </div>
            <footer className="w-full bg-blue-800 text-white py-4 text-center">
                <p>&copy; {new Date().getFullYear()} PresencePlus. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
