import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Card, Table } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [totalInventory, setTotalInventory] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchData();
    fetchSalesData();
  }, []);

  const fetchData = async () => {
    try {
      const ordersResponse = await axios.get('http://localhost:5000/api/orders');
      setTotalOrders(ordersResponse.data.length);

      const suppliersResponse = await axios.get('http://localhost:5000/api/suppliers');
      setTotalSuppliers(suppliersResponse.data.length);

      const inventoryResponse = await axios.get('http://localhost:5000/api/inventory');
      setTotalInventory(inventoryResponse.data.length);

      const employeesResponse = await axios.get('http://localhost:5000/api/employees');
      setTotalEmployees(employeesResponse.data.length);
      setEmployees(employeesResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error.message || error);
    }
  };

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports/sales-report', {
        params: { startDate: '2025-01-06', endDate: '2025-01-07' },
      });

      const formattedSalesData = response.data.map((item) => ({
        month: item._id, // Replace with the correct field
        sales: item.totalSales,
      }));

      setSalesData(formattedSalesData);
    } catch (error) {
      console.error('Error fetching sales data:', error.message || error);
    }
  };

  const salesChartData = {
    labels: salesData.map((data) => data.month),
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: salesData.map((data) => data.sales),
      },
    ],
  };

  const salesPieData = {
    labels: salesData.map((data) => data.month),
    datasets: [
      {
        data: salesData.map((data) => data.sales),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#4BC0C0',
          '#9966FF',
          '#C9CBCF',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#4BC0C0',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#4BC0C0',
          '#9966FF',
          '#C9CBCF',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#4BC0C0',
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 p-0 vh-100 bg-dark" style={{ position: 'fixed', left: 0, top: 0 }}>
            <Sidebar />
          </div>

          <div className="col-md-10 offset-md-2" style={{ marginTop: '60px' }}>
            <div className="mt-4 px-3">
              <h1>Admin Dashboard</h1>

              <div className="row mt-5">
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Orders</Card.Title>
                      <Card.Text>{totalOrders}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Suppliers</Card.Title>
                      <Card.Text>{totalSuppliers}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Inventory</Card.Title>
                      <Card.Text>{totalInventory}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-3">
                  <Card className="custom-card text-center mb-4">
                    <Card.Body>
                      <Card.Title>Total Employees</Card.Title>
                      <Card.Text>{totalEmployees}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-12">
                  <h3>Employees</h3>
                  <Table className="custom-table" striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr key={employee._id}>
                          <td>{employee.name}</td>
                          <td>{employee.department}</td>
                          <td>{employee.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-6">
                  <h3>Sales Bar Chart</h3>
                  <div className="chart-container">
                    <Bar data={salesChartData} />
                  </div>
                </div>
                <div className="col-md-6">
                  <h3>Sales Pie Chart</h3>
                  <div className="chart-container">
                    <Pie data={salesPieData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
