import React, { useState, useEffect } from 'react';
import "./App.css"

const App = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    state: '',
    city: '',
    standard: '',
    dob: '',
    gender: '',
    totalMarks: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      if (response.ok) {
        const data = await response.json();
        setStudents([...students, data]);
        setNewStudent({
          name: '',
          state: '',
          city: '',
          standard: '',
          dob: '',
          gender: '',
          totalMarks: '',
        });
      } else {
        console.error('Error creating student:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  return (
    <div>
      <h1>Student Master</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Student Name:
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            name="state"
            value={newStudent.state}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            name="city"
            value={newStudent.city}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Standard:
          <input
            type="text"
            name="standard"
            value={newStudent.standard}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          DOB:
          <input
            type="date"
            name="dob"
            value={newStudent.dob}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={newStudent.gender}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Total Marks:
          <input
            type="number"
            name="totalMarks"
            value={newStudent.totalMarks}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <button type="submit">Add Student</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>State</th>
            <th>City</th>
            <th>Standard</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.state}</td>
              <td>{student.city}</td>
              <td>{student.standard}</td>
              <td>{student.dob}</td>
              <td>{student.gender}</td>
              <td>{student.totalMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
