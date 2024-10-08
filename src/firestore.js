
import { collection, addDoc, updateDoc, arrayUnion, doc, getDoc, query, where, orderBy, getDocs } from 'firebase/firestore';

import { db } from './firebaseConfig';

export const addStudent = async (teacherId, name, rollNo) => {
    try {
        const studentRef = await addDoc(collection(db, 'students'), {
            name,
            rollNo,
            teacherId,
            attendance: []
        });

        await updateDoc(doc(db, 'teachers', teacherId), {
            students: arrayUnion(studentRef.id)
        });

        return studentRef.id;
    } catch (error) {
        throw error;
    }
};

export const addAttendance = async (studentId, date, present) => {
    try {
        const studentRef = doc(db, 'students', studentId);
        await updateDoc(studentRef, {
            attendance: arrayUnion({ date, present })
        });
    } catch (error) {
        throw error;
    }
};


export const updateAttendance = async (teacherId, date, attendanceRecords) => {
    try {
        const teacherRef = doc(db, 'teachers', teacherId);
        await updateDoc(teacherRef, {
            attendance: arrayUnion({ date, students: attendanceRecords })
        });
    } catch (error) {
        console.error('Error updating attendance:', error);
        throw error;
    }
};



export const getTeacherWithStudents = async (teacherId) => {
    try {
        const teacherDoc = await getDoc(doc(db, 'teachers', teacherId));
        if (!teacherDoc.exists()) {
            throw new Error('Teacher not found');
        }

        const teacherData = teacherDoc.data();

      
        const studentRefs = teacherData.students.map(studentId => getDoc(doc(db, 'students', studentId)));
        const studentDocs = await Promise.all(studentRefs);

        const students = studentDocs
            .filter(doc => doc.exists()) 
            .map(doc => ({ id: doc.id, ...doc.data() }));

        return { ...teacherData, students };
    } catch (error) {
        console.error('Error fetching teacher data:', error);
        throw error;
    }
};


export const getAttendanceForRange = async (teacherId, startDate, endDate) => {
    try {
        
        if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
            throw new Error('Invalid date format');
        }

        
        const teacherRef = doc(db, 'teachers', teacherId);
        const teacherDoc = await getDoc(teacherRef);

        if (!teacherDoc.exists()) {
            throw new Error('Teacher not found');
        }

        const teacherData = teacherDoc.data();
        const attendanceData = teacherData.attendance || [];

       
        const filteredAttendance = attendanceData.filter(record => {
            const recordDate = new Date(record.date);
            return recordDate >= startDate && recordDate <= endDate;
        });

        
        const flattenedAttendance = [];
        filteredAttendance.forEach(record => {
            record.students.forEach(student => {
                flattenedAttendance.push({
                    date: record.date,
                    studentId: student.studentId,
                    rollNo: student.rollNo,  
                    present: student.present
                });
            });
        });

        return flattenedAttendance;
    } catch (error) {
        console.error('Error fetching attendance data:', error);
        throw error;
    }
};
