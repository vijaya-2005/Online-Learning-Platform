import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';            // Ensure this path is correct
import axiosInstance from '../common/AxiosInstance';  // Ensure this path is correct
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const Account = () => {
  const user = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // add other fields if needed, e.g., phone, bio
  });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.userData) {
      setFormData({
        name: user.userData.name || '',
        email: user.userData.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await axiosInstance.put('/api/user/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
        setSuccessMsg('Profile updated successfully!');
        // Optionally update context user data here if needed
      } else {
        setErrorMsg(res.data.message || 'Failed to update profile.');
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'An error occurred while updating profile.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '600px' }}>
      <h2>My Account</h2>

      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            disabled  // If you want users to not change email
            placeholder="Your email address"
          />
        </Form.Group>

        {/* Add more fields here as needed */}

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> Updating...
            </>
          ) : (
            'Update Profile'
          )}
        </Button>
      </Form>
    </div>
  );
};

export default Account;
