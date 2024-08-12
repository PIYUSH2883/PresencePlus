
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../src/component/navbar';
import SignUp from './component/sign-up';
import SignIn from './component/sign-in';
import TeacherDashboard from './component/teacherDashBoard';
import Home from './component/Home/Home';

function App() {
  

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/teacherDashboard/:teacherId" element={<TeacherDashboard />} />
      </Routes>
      </Router>
    </>
  )
}


// function Home() {
//   return (
//     <div>
//       <h1>Welcome to Attendance Tracker</h1>
      
//     </div>
//   );
// }

export default App
