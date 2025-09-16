'use client';

import { useState, useEffect,useCallback } from 'react';
import Link from 'next/link';
import AdminLogin from './AdminLogin.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import TopHeader from '@/components/TopHeader.jsx';
import  supabase  from '@/lib/supabaseClient.js';
import brand from '@/public/assets/brandG.png';
import Image from 'next/image.js';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated
    const checkAuth = async () => {
      // Simulate an authentication check
      // In a real application, you would replace this with an actual API call to check authentication
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
        setIsAuthenticated(false);
        return;
      }

      if(!data.session) {
        console.log('No active session found');
        setIsAuthenticated(false);
        return;
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error fetching user data:', userError);
        setIsAuthenticated(false);
        return;
      }

    //   if (session?.user) {
    //     const { data: adminData, error: userError } = await supabase
    //       .from('Admins')
    //       .select('role')
    //       .eq('id', '44c00088b-babb-4187-aca4-63e643321d12')
    //       .single();

    //   if (userError) {
    //     console.error('Error fetching admin data:', userError);
    //     setIsAuthenticated(false);
    //     return;
    //   } else {
    //     setIsAuthenticated(adminData?.role === 'admin');
    //   }
    // } else {
    //     setIsAuthenticated(false);
    //   }
  }
  checkAuth();
  }, []);


  // Function to handle login
  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  // Function to handle logout
  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  // Render the admin page

  return (
    <>
      <TopHeader/>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 cursor-pointer">
                <Image src={brand} alt="Shipwide Logistics" style={{objectFit: "contain", height: "100px", width: "100px"}} />
              </Link>
              <span className="text-secondary font-medium">Admin Portal</span>
            </div>
          </div>
        </header>

        {!isAuthenticated ? (
          <AdminLogin onLogin={handleLogin} />
        ) : (
            <AdminDashboard onLogout={handleLogout} />
        )}
      </div>
    </>
  );
}