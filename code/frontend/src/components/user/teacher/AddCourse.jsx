import { useState, useContext } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { UserContext } from '../../../App';
import axiosInstance from '../../common/AxiosInstance';

const AddCourse = () => {
  const user = useContext(UserContext);
  const [addCourse, setAddCourse] = useState({
    userId: user.userData._id,
    C_educator: '',
    C_title: '',
    C_categories: '',
    C_price: '',
    C_description: '',
    sections: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddCourse({ ...addCourse, [name]: value });
  };

  const handleCourseTypeChange = (e) => {
    setAddCourse({ ...addCourse, C_categories: e.target.value });
  };

  const addInputGroup = () => {
    setAddCourse({
      ...addCourse,
      sections: [
        ...addCourse.sections,
        {
          S_title: '',
          S_description: '',
          S_content: null,
        },
      ],
    });
  };

  const handleChangeSection = (index, e) => {
    const updatedSections = [...addCourse.sections];
    const sectionToUpdate = updatedSections[index];

    if (e.target.name === 'S_content') {
      const file = e.target.files[0];
      if (file) {
        if (file.type !== 'video/mp4') {
          alert('Only .mp4 video files are allowed.');
          e.target.value = null;
          return;
        }
        sectionToUpdate.S_content = file;
      }
    } else {
      sectionToUpdate[e.target.name] = e.target.value;
    }

    setAddCourse({ ...addCourse, sections: updatedSections });
  };

  const removeInputGroup = (index) => {
    const updatedSections = [...addCourse.sections];
    updatedSections.splice(index, 1);
    setAddCourse({
      ...addCourse,
      sections: updatedSections,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(addCourse).forEach((key) => {
      if (key === 'sections') {
        addCourse[key].forEach((section, index) => {
          formData.append(`sections[${index}][S_title]`, section.S_title);
          formData.append(`sections[${index}][S_description]`, section.S_description);
          if (section.S_content instanceof File) {
            formData.append(`sections[${index}][S_content]`, section.S_content);
          }
        });
      } else {
        formData.append(key, addCourse[key]);
      }
    });

    try {
      const res = await axiosInstance.post('/api/user/addcourse', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 201 && res.data.success) {
        alert(res.data.message);
        // Optionally reset form or navigate away here
      } else {
        alert('Failed to create course');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while creating the course, only .mp4 videos can be uploaded');
    }
  };

  return (
    <div>
      <Form className="mb-3" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridJobType">
            <Form.Label>Course Type</Form.Label>
            <Form.Select value={addCourse.C_categories} onChange={handleCourseTypeChange} required>
              <option value="">Select categories</option>
              <option>IT & Software</option>
              <option>Finance & Accounting</option>
              <option>Personal Development</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridTitle">
            <Form.Label>Course Title</Form.Label>
            <Form.Control
              name="C_title"
              value={addCourse.C_title}
              onChange={handleChange}
              type="text"
              placeholder="Enter Course Title"
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEducator">
            <Form.Label>Course Educator</Form.Label>
            <Form.Control
              name="C_educator"
              value={addCourse.C_educator}
              onChange={handleChange}
              type="text"
              placeholder="Enter Course Educator"
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPrice">
            <Form.Label>Course Price(Rs.)</Form.Label>
            <Form.Control
              name="C_price"
              value={addCourse.C_price}
              onChange={handleChange}
              type="text"
              placeholder="For free course, enter 0"
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridDescription">
            <Form.Label>Course Description</Form.Label>
            <Form.Control
              name="C_description"
              value={addCourse.C_description}
              onChange={handleChange}
              required
              as="textarea"
              placeholder="Enter Course description"
            />
          </Form.Group>
        </Row>

        <hr />

        {addCourse.sections.map((section, index) => (
          <div
            key={index}
            className="d-flex flex-column mb-4 border rounded-3 border-3 p-3 position-relative"
          >
            <Col xs={24} md={12} lg={8}>
              <span
                style={{ cursor: 'pointer' }}
                className="position-absolute top-0 end-0 p-1"
                onClick={() => removeInputGroup(index)}
              >
                ❌
              </span>
            </Col>
            <Row className="mb-3">
              <Form.Group as={Col} controlId={`formSectionTitle${index}`}>
                <Form.Label>Section Title</Form.Label>
                <Form.Control
                  name="S_title"
                  value={section.S_title}
                  onChange={(e) => handleChangeSection(index, e)}
                  type="text"
                  placeholder="Enter Section Title"
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId={`formSectionContent${index}`}>
                <Form.Label>Section Content (Only .mp4 Video)</Form.Label>
                <Form.Control
                  name="S_content"
                  onChange={(e) => handleChangeSection(index, e)}
                  type="file"
                  accept=".mp4,video/mp4"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId={`formSectionDescription${index}`} className="mb-3">
                <Form.Label>Section Description</Form.Label>
                <Form.Control
                  name="S_description"
                  value={section.S_description}
                  onChange={(e) => handleChangeSection(index, e)}
                  required
                  as="textarea"
                  placeholder="Enter Section description"
                />
              </Form.Group>
            </Row>
          </div>
        ))}

        <Row className="mb-3">
          <Col xs={24} md={12} lg={8}>
            <Button size="sm" variant="outline-secondary" onClick={addInputGroup}>
              ➕ Add Section
            </Button>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddCourse;
