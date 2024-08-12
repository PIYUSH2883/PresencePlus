import React, { useState } from 'react';
import { addStudent } from '../firestore';

const AddStudent = ({ teacherId, onClose, onStudentAdded }) => {
    const [name, setName] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addStudent(teacherId, name, rollNo);
            onStudentAdded();
            onClose(); 
        } catch (err) {
            setError('Failed to add student. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Add New Student</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Student Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mb-4 p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Roll No"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        className="w-full mb-4 p-2 border rounded"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-4">Cancel</button>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Student</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;
