import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Students({ onLogout }) {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({ name: '', course: '' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
      setMessage('Failed to load students.');
    }
  };

  const saveStudent = async () => {
    try {
      if (editingId) {
        // Update existing student
        await axios.put(`http://localhost:5000/api/students/${editingId}`, student);
        setMessage('Student updated successfully.');
      } else {
        // Add new student
        await axios.post('http://localhost:5000/api/students', student);
        setMessage('Student added successfully.');
      }
      fetchStudents();
      setStudent({ name: '', course: '' });
      setEditingId(null);
    } catch (err) {
      console.error('Save failed:', err);
      setMessage('Failed to save student.');
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        fetchStudents();
        setMessage('Student deleted.');
      } catch (err) {
        console.error('Delete failed:', err);
        setMessage('Failed to delete student.');
      }
    }
  };

  const editStudent = (s) => {
    setStudent({ name: s.name, course: s.course });
    setEditingId(s._id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setStudent({ name: '', course: '' });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="page-center">
      <div className="container">
        <h2>Student Course Manager</h2>
        {message && <p style={{ color: 'gray', fontSize: '14px' }}>{message}</p>}
        <input
          placeholder="Name"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
        />
        <input
          placeholder="Course"
          value={student.course}
          onChange={(e) => setStudent({ ...student, course: e.target.value })}
        />
        <button
          onClick={saveStudent}
          disabled={!student.name || !student.course}
        >
          {editingId ? 'Update Student' : 'Save Student'}
        </button>
        {editingId && (
          <button
            style={{ backgroundColor: '#9e9e9e', marginTop: '8px' }}
            onClick={cancelEdit}
          >
            Cancel
          </button>
        )}
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.course}</td>
                <td>
                  <button onClick={() => editStudent(s)}>Edit</button>
                  <button onClick={() => deleteStudent(s._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
