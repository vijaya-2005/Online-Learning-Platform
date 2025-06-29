import  { useContext } from 'react';
import { UserContext } from '../../App'; // Adjust the path as necessary
import { Link } from 'react-router-dom';

const UserHome = () => {
  const { userData } = useContext(UserContext);

  return (
    <div className="container mt-5">
      <h2>Welcome, {userData?.name || 'Student'}!</h2>
      <p className="lead">Here &apos;s what you can do:</p>

      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">My Dashboard</h5>
              <p className="card-text">View your enrolled courses and progress.</p>
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Browse Courses</h5>
              <p className="card-text">Explore available courses and enroll.</p>
              <Link to="/courses" className="btn btn-success">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Account Settings</h5>
              <p className="card-text">Manage your profile and preferences.</p>
              <Link to="/account" className="btn btn-warning">
                Account Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
