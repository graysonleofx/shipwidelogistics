'use client';

import { useState } from 'react';
import  supabase  from '@/lib/supabaseClient';
import brand from '@/public/assets/brand.png';


export default function AdminLogin( { onLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!credentials.email || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });

    // If using Supabase, you might want to check the user role or other details
    // For example, you can check if the user has an 'admin' role in your database
    if (data.user && data.user.role !== 'admin') {
      setError('You do not have permission to access this area');
    }
    // Handle the response from Supabase
    // If the login was successful, redirect or perform any other action
    if (data.user && data.user.role === 'admin') {
      onLogin();
    }

    // if (error || !data) {
    //   setError('Invalid email, username or password');
    // } else {
    //   onLogin();
    // }

    // Reset the loading state
    setIsLoading(false);
  };

  // Create an async function to handle admin login:
  // 1. Prevent the default form submission behavior.
  // 2. Validate the input fields.
  // 3. sign in using supabase with email and password.
  // 4. show error if login fails or user is not an admin/found.
  // 5. Check if the user's role in user data is 'admin'.
  // 6. Show error if role is not 'admin'.
  // 7. If everything is valid, call onLogin function to proceed with the admin dashboard access and stop loading state.

  // This function will handle the form submission for the admin login
  // It will validate the input fields, check the credentials, and call the onLogin function
  // if the login is successful
 
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!onLogin) {
      throw new Error('onLogin function is required');
    }
    if (isLoading) return;
    if (error) {
      setError('');
    }
    if (credentials.email === '' || credentials.password === '') {
      setError('Please fill in all fields');
      return;
    } else if (credentials.email !== 'admin@shipwideLogistics.online') {
      setError('Invalid email or password');
      return;
    } else if (credentials.password !== '1937519375@123') {
      setError('Invalid email or password');
      return;
    }
    try{
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });
      if (error) {
        setError('Invalid email or password', error.message);
        setIsLoading(false);
        return;
      }
      // If the login is successful, call the onLogin function
      onLogin();
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again later.');
      setIsLoading(false);
      return;
    }
    // If you are using Supabase, you can use the following code to sign in
    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email: credentials.email,
    //   password: credentials.password
    // });
    // if (error) {
    //   setError('Invalid email or password');
    //   setIsLoading(false);
    //   return;
    // }
    // // If the login is successful, call the onLogin function
    // if (data.user && data.user.role === 'admin') {
    //   onLogin();
    // }
    // setIsLoading(false);

    // // If the login fails, set an error message
    // if (data || !data.user || data.user.role !== 'admin') {
    //   setError('Access denied. You must be an admin to log in.');
    //   setIsLoading(false);
    //   return;
    // }
  }

  // setTimeout(() => {
  //   // Simulate checking credentials
  //   if (credentials.password === 'admin123' && credentials.email === 'admin@admin.com') {
  //     onLogin();
  //   } else {
  //     setError('Invalid email or password');
  //   }
  //   setIsLoading(false);
  // }, 1000);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-admin-line text-secondary text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Admin Login</h2>
            <p className="text-gray-600 mt-2">Access the shipment management dashboard</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              <div className="flex items-center">
                <i className="ri-error-warning-line text-red-500 text-xl mr-2"></i>
                {error}
              </div>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="text"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none text-sm"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none text-sm"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-secondary hover:bg-secondary/60 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <i className="ri-loader-4-line animate-spin mr-2"></i>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
            <p className="text-sm text-blue-700">Username: admin</p>
            <p className="text-sm text-blue-700">Password: admin123</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}