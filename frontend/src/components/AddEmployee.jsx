// src/components/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = ({ onEmployeeAdded }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEmployee = { name, department, email };
      await axios.post('http://localhost:5000/api/employees', newEmployee);

      // Reset form and notify parent
      setName('');
      setDepartment('');
      setEmail('');
      setError('');
      setSuccess('Employee added successfully!');

      // Call parent callback if provided
      if (typeof onEmployeeAdded === 'function') {
        onEmployeeAdded();
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('Failed to add employee. Please check the details or try again later.');
      setSuccess('');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add New Employee</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <input
            type="text"
            className="form-control"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
