import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeacherWithStudents, updateAttendance } from '../firestore';
import AddStudent from './addStudent';

const TeacherDashboard = () => {
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [attendanceMap, setAttendanceMap] = useState({});
    const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

    const fetchTeacher = async () => {
        try {
            const teacherData = await getTeacherWithStudents(teacherId);
            setTeacher(teacherData);
            loadAttendanceForDate(teacherData, selectedDate);
        } catch (error) {
            console.error('Error fetching teacher data:', error);
        }
    };

    const loadAttendanceForDate = (teacherData, date) => {
        const attendanceRecord = (teacherData.attendance || []).find(record => record.date === date) || { students: [] };
        const initialAttendance = {};
        attendanceRecord.students.forEach(student => {
            initialAttendance[student.rollNo] = student.present;
        });
        setAttendanceMap(initialAttendance);
    };

    useEffect(() => {
        fetchTeacher();
    }, [teacherId]);

    useEffect(() => {
        if (teacher) {
            loadAttendanceForDate(teacher, selectedDate);
        }
    }, [selectedDate, teacher]);

    const handleAttendanceChange = (rollNo, isPresent) => {
        setAttendanceMap(prevState => ({
            ...prevState,
            [rollNo]: isPresent
        }));
    };

    const handleSaveAttendance = async () => {
        try {
            const attendanceRecords = teacher.students.map(student => ({
                studentId: student.id,
                name: student.name,
                rollNo: student.rollNo,
                present: attendanceMap[student.rollNo] !== undefined ? attendanceMap[student.rollNo] : false
            }));
            await updateAttendance(teacherId, selectedDate, attendanceRecords);
            fetchTeacher(); // Refresh data after saving attendance
        } catch (error) {
            console.error('Error saving attendance:', error);
        }
    };

    const handleStudentAdded = () => {
        fetchTeacher(); // Refresh the student list after adding a student
    };

    return (
        <div className="min-h-screen p-4 pt-20 bg-gray-200">
            {teacher ? (
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-6">
                        <h1 className="text-2xl my-2 font-bold text-gray-800">{teacher.name}</h1>
                        <h2 className="text-xl text-gray-600">{teacher.subject}</h2>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700">Select Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Students ({new Date(selectedDate).toLocaleDateString()}):</h3>
                        <ul className="divide-y divide-gray-200">
                            {teacher.students.map((student, index) => (
                                <li key={index} className="py-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-800">{student.name}</p>
                                        <p className="text-sm text-gray-500">Roll No: {student.rollNo}</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={attendanceMap[student.rollNo] || false}
                                        onChange={(e) => handleAttendanceChange(student.rollNo, e.target.checked)}
                                        className="form-checkbox h-5 w-5 text-green-600"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            onClick={handleSaveAttendance}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Save Attendance
                        </button>
                        <button
                            onClick={() => setIsAddStudentOpen(true)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Add Student
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-600">Loading...</p>
            )}

            {isAddStudentOpen && (
                <AddStudent
                    teacherId={teacherId}
                    onClose={() => setIsAddStudentOpen(false)}
                    onStudentAdded={handleStudentAdded}
                />
            )}
        </div>
    );
};

export default TeacherDashboard;
