import React, { useEffect, useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd';
import {jwtDecode }from 'jwt-decode'; // for optional expiry check
import config from '../config'


const AdminLoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
         const res = await axios.post(`${config.apiUrl}/users/login`, values);

      const { token } = res.data;

      if (token) {
        // Optionally decode and store expiry
        const decoded = jwtDecode(token);
        const expiry = decoded.exp * 1000;
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiry', expiry);

        // Optionally fetch current user
        const userRes = await axios.get(`${config.apiUrl}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = userRes.data;
        localStorage.setItem('currentUser', JSON.stringify(user)); 

        alert('Login successful');
        resetForm();
        navigate('/admin/home');
      } else {
        alert('Login failed: No token received');
      }
    } catch (err) {
      console.error('Login Failed:', err.response?.data?.message || err.message);
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('tokenExpiry');
    if (token && expiry && Date.now() < parseInt(expiry)) {
      navigate('/admin/home');
    }
  }, [navigate]);

  return (
    <div className="admin-login-container">
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className="admin-login-form">
            <h2>Admin Login</h2>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                id="username"
                {...formik.getFieldProps('username')}
                className={formik.touched.username && formik.errors.username ? 'is-invalid' : ''}
              />
              <ErrorMessage name="username" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input.Password
                id="password"
                {...formik.getFieldProps('password')}
                className={formik.touched.password && formik.errors.password ? 'is-invalid' : ''}
              />
              <ErrorMessage name="password" component="div" className="form-error" />
            </div>

            <Button type="primary" htmlType="submit" loading={loading} className="login-button">
              Login
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AdminLoginForm;
