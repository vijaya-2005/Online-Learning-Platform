import { useState } from 'react';
import { Container } from 'react-bootstrap';

import UserHome from "./UserHome";
import AddCourse from '../user/teacher/AddCourse';
import EnrolledCourses from '../user/student/EnrolledCourses';
import CourseContent from '../user/student/CourseContent';
import AllCourses from '../admin/AllCourses';
import AccountSettings from '../common/Account'; // Placeholder for account settings component

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState('home');

  const renderSelectedComponent = () => {
    console.log('Selected Component:', selectedComponent); // debug log

    switch (selectedComponent) {
      case 'home':
        return <UserHome />;
      case 'addcourse':
        return <AddCourse />;
      case 'enrolledcourse':
        return <EnrolledCourses />;
      case 'courseSection':
        return <CourseContent />;
      case 'courses':
        return <AllCourses />;
      case 'account':
         return <AccountSettings />; // Placeholder for account settings
      default:
        return <UserHome />;
    }
  };

  return (
    <>
      {/* Simple NavBar simulation with buttons */}
      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => setSelectedComponent('home')}>Home</button>
        <button onClick={() => setSelectedComponent('addcourse')}>Add Course</button>
        <button onClick={() => setSelectedComponent('enrolledcourse')}>Enrolled Courses</button>
        <button onClick={() => setSelectedComponent('courseSection')}>Course Content</button>
      </nav>

      <Container className='my-3'>
        {renderSelectedComponent()}
      </Container>
    </>
  );
};

export default Dashboard;
