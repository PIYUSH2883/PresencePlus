import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAttendanceForRange } from '../firestore'; // Adjust import path as needed

const ViewAttendance = () => {
    const { teacherId } = useParams();
    const [attendanceData, setAttendanceData] = useState([]);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const data = await getAttendanceForRange(teacherId, new Date(startDate), new Date(endDate));
                console.log('Fetched Attendance Data:', data); // Log the fetched data
                setAttendanceData(data);
                console.log("xyz,",setAttendanceData)
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchAttendanceData();
    }, [teacherId, startDate, endDate]);

    const handleFetchData = () => {
        fetchAttendanceData(); // Refetch data when the button is clicked
    };

    const handleBack = () => {
        navigate(`/teacherDashboard/${teacherId}`);
    };

  
    const uniqueDates = [...new Set(attendanceData.map(record => record.date))];
    const uniqueRollNumbers = [...new Set(attendanceData.map(record => record.rollNo))];

    
    const getAttendanceStatus = (rollNo, date) => {
        const record = attendanceData.find(record => record.rollNo === rollNo && record.date === date);
        return record ? (record.present ? 'Present' : 'Absent') : 'N/A';
    };

    return (
        <div className="p-6 mt-10 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Select Attendance Range</h2>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-medium">Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-2 border rounded"
                />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-medium">End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-2 border rounded"
                />
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handleFetchData}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Fetch Data
                </button>
                <button
                    onClick={handleBack}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                    Back
                </button>
            </div>
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Attendance Records:</h3>
                {attendanceData.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border border-gray-200 bg-blue-400">Roll Number</th>
                                {uniqueDates.map((date, dateIndex) => (
                                    <th key={dateIndex} className="py-2 px-4 border border-gray-200 bg-blue-400">{date}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {uniqueRollNumbers.map((rollNo, rollNoIndex) => (
                                <tr key={rollNoIndex}>
                                    <td className="py-2 px-4 border border-gray-200">{rollNo}</td>
                                    {uniqueDates.map((date, dateIndex) => (
                                        <td
                                            key={`${rollNo}-${dateIndex}`}
                                            className={`py-2 px-4 border border-gray-200 text-center ${getAttendanceStatus(rollNo, date) === 'Present' ? 'text-green-500' : 'text-red-500'}`}
                                        >
                                            {getAttendanceStatus(rollNo, date)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No attendance records found for this range.</p>
                )}
            </div>
        </div>
    );
};

export default ViewAttendance;
