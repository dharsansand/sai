import React, { useEffect, useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd';
import { jwtDecode } from 'jwt-decode';
import config from '../config';
import Lightfall from './Lightfall'
import './AdminLogin.css';

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
        const decoded = jwtDecode(token);
        const expiry = decoded.exp * 1000;
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiry', expiry);

        const userRes = await axios.get(`${config.apiUrl}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.setItem('currentUser', JSON.stringify(userRes.data)); 
        alert('Login successful');
        resetForm();
        navigate('/admin/dashboard');
      } else {
        alert('Login failed: No token received');
      }
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('tokenExpiry');
    if (token && expiry && Date.now() < parseInt(expiry)) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  return (
    <div className="admin-page-wrapper">
      {/* Background Component */}
      <div className="background-layer">
        <Lightfall
           
  colors={['#FFD700', '#D4AF37', '#F9E2AF', '#B8860B', '#FFDF00']}
  backgroundColor="#050400"                                                        
          speed={0.5}
          streakCount={2}
          streakWidth={1}
          streakLength={1}
          glow={1}
          density={0.6}
          twinkle={1}
          zoom={3}
          backgroundGlow={0.5}
          opacity={1}
          mouseInteraction={true}
        />
      </div>

      <div className="admin-login-container">
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="admin-login-form">
              <div className="form-header">
                <h2>Admin Portal</h2>
                <p>Welcome back, please login to your account.</p>
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  id="username"
                  size="large"
                  placeholder="Enter username"
                  {...formik.getFieldProps('username')}
                  className={formik.touched.username && formik.errors.username ? 'is-invalid' : ''}
                />
                <ErrorMessage name="username" component="div" className="form-error" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input.Password
                  id="password"
                  size="large"
                  placeholder="Enter password"
                  {...formik.getFieldProps('password')}
                  className={formik.touched.password && formik.errors.password ? 'is-invalid' : ''}
                />
                <ErrorMessage name="password" component="div" className="form-error" />
              </div>

              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                className="login-button"
                block
                size="large"
              >
                Login
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminLoginForm;