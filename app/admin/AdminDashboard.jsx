'use client';

import { useState, useEffect } from 'react';
import  supabase from '@/lib/supabaseClient';
// import { sendEmailNotification } from '@/lib/sendEmailNotify';


export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [shipments, setShipments] = useState([
    {
      id: 'LGS001',
      customer: 'ABC Corporation',
      origin: 'Shanghai Port',
      destination: 'New York Port',
      status: 'In Transit',
      created: '2024-01-15',
      estimated: '2024-01-25'
    },
    {
      id: 'LGS002',
      customer: 'XYZ Industries',
      origin: 'Hamburg Port',
      destination: 'Miami Warehouse',
      status: 'Delivered',
      created: '2024-01-10',
      estimated: '2024-01-20'
    }
  ]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  const [userStat, setUserStat] = useState({
    totalUsers: 0
  });

  const [statss, setStatss] = useState({
    totalShipments: 0,
    inTransit: 0,
    delivered: 0,
    processing: 0
  });


  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase.from('Users').select('*');
      if (error) {
        console.error('Error fetching users:', error);
        return;
      }
      const totalUsers = data.length;
      setUsers(data);
      // console.log('Fetched users:', data);
      setUserStat({ totalUsers });
    };
    fetchStats();
  }, [users]);

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase.from('Shipments').select('*');
      if (error) {
        console.error('Error fetching shipments:', error);
        return;
      }
      const totalShipments = data.length;
      const inTransit = data.filter(s => s.status === 'In Transit').length;
      const delivered = data.filter(s => s.status === 'Delivered').length;
      const processing = data.filter(s => s.status === 'Processing').length;

      setStatss({
        totalShipments,
        inTransit,
        delivered,
        processing
      });
    }
    fetchStats();
  }, [ shipments ]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('Users').select('id, email');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
        // console.log('Fetched users:', data);
      }
    };
    fetchUsers();
  }, []);

  const [newUser, setNewUser] = useState({
    fullname: '',
    email: '',
    password: ''
  });

  const [newShipment, setNewShipment] = useState({
    receiverName: '',
    senderName: '',
    receiverEmail: '',
    from: '',
    to: '',
    estimatedDelivery: '',
    description: '',
    weight: ''
  });

  const generateTrackingId = () => {
    const prefix = 'TRK-';
    const number = Math.floor(Math.random() * 9000000) + 1000000;
    return `${prefix}${number}`;
  };


  const [editingShipmentId, setEditingShipmentId] = useState(null);
  const [editRoute, setEditRoute] = useState({
    from: '',
    date: ''
  });
  const [editStatus, setEditStatus] = useState({})

  const handleEditRoute = (shipment) => {
  setEditingShipmentId(shipment.id);
    setEditRoute({
      from: shipment.from || '',
      date: shipment.routeDate || shipment.created || ''
    });
  };

  const formatDate = (isoDate) => isoDate ? new Date(isoDate).toISOString().split('T')[0] : '';

  const handleSaveRoute = async (id) => {
    const { from, date, newStatus } = editRoute;
    const { data, error } = await supabase
      .from('Shipments')
      .update({ from, status: newStatus, currentDate: formatDate(date)})
      .eq('id', id)
      .select();
    if (error) {
      alert('Failed to update route.');
      return;
    }
    // Update the local state with the new route
    setShipments(prev =>
      prev.map(shipment =>
        shipment.id === id ? { ...shipment, from, currentDate: formatDate(date), newStatus} : shipment
      )
    );
    setEditingShipmentId(null);
    setEditRoute({ from: '', date: '' });
    // alert('Route updated successfully!')

    console.log('Saving route with status:', newStatus )

    if(!newStatus || newStatus.trim() === ''){
      // alert('please select a valid status')
      return;
    }
    await updateTimeline (id, {
      status: newStatus,
      // from,
      currentDate: formatDate(date),
      completed: false
    })

    console.log({from, newStatus, date})
  };

  // Create a new user in supabase 'Users' table with name, and email
  const createUser = async (e) => {
    e.preventDefault();
    const newUsers = {
      fullname: newUser.fullname,
      email: newUser.email,
      password: newUser.password
    };
    if (!newUsers.fullname || !newUsers.email || !newUsers.password) {
      alert('Please fill in all fields');
      return;
    }
    if (newUsers.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    if (!newUsers.email.includes('@')) {
      alert('Invalid email format');
      return;
    }
    try {
      const { data : authUser, error } = await supabase.auth.signUp({
        email: newUsers.email,
        password: newUsers.password
      });
      if (authUser && authUser.user) {
        await supabase
          .from('Users')
          .insert([{ 
            id: authUser.user.id,
            fullname: authUser.user.fullname,
            email: authUser.user.email
          }]);
      }
      if (error) {
        if(error.message.includes('User already registered')) {
          alert('User already exists. Please try a different email.');
          return;
        }else if (error.message.includes('Invalid email')) {
          alert('Invalid email format. Please enter a valid email address.');
        }else{
          console.error('Error creating user:', error);
          setNewUser({
            fullname: '',
            email: '',
            password: ''
          });
          alert('An error occurred while creating the user. Please try again later.');
          return;
        }
      }
      // Insert into the Users table only if not already there 
      const { data, error: insertError } = await supabase
        .from('Users')
        .upsert([{ 
          id: authUser?.user?.id,
          fullname: newUsers.fullname,
          email: newUsers.email
        }]);
      if (insertError) {
        console.error('Error inserting user:', insertError);
        alert('An error occurred while inserting the user. Please try again later.');
        return;
      }
      // Successfully created user
      console.log('User created successfully:', data);
    } catch (error) {
      console.error('Error during user creation:', error);
      alert('An error occurred while creating the user. Please try again later.');
      return;
    }
    alert('User created successfully!');
    setNewUser({
      fullName: '',
      email: '',
      password: ''
    });
  };

  // Insert new shipment linked to a user by user email
  const createShipment = async (e) => {
    e.preventDefault(); 
    const trackingId = generateTrackingId();
    const newShip = {
      id: trackingId,
      receiverName: newShipment.receiverName,
      senderName: newShipment.senderName,
      receiverEmail: selectedUser,
      description: newShipment.description,
      weight: newShipment.weight,
      from: newShipment.from,
      to: newShipment.to,
      status: 'Processing',
      created: new Date().toISOString().split('T')[0],
      estimatedDelivery: newShipment.estimatedDelivery,
      timeline: []
    };


    const { data, error } = await supabase
      .from('Shipments')
      .insert([newShip])
      .select();
    if (error || !data || data.length === 0) {
      console.error('Error creating shipment:', error);
      alert('Failed to create shipment. Please try again.');
      return;
    }
    setShipments(prev => [data[0], ...prev]);
    setNewShipment({
      receiverName: '',
      senderName: '', 
      receiverEmail: '',
      description: '',
      weight: '',
      from: '',
      to: '',
      estimatedDelivery: '',
      trackingId: trackingId,
      created: new Date().toISOString().split('T')[0],
    });


    alert(`Shipment created successfully! Tracking ID: ${trackingId}`);

    await updateTimeline(trackingId, {
      status: 'Processing',
      // from: newShipment.from,
      currentDate: new Date().toISOString().split('T')[0],
      completed: true
    })

    // Send email notification to the user
    const shipmentDetails = {
      receiverName: newShip.receiverName,
      senderName: newShip.senderName,
      receiverEmail: newShip.receiverEmail,
      description: newShip.description,
      weight: newShip.weight,
      from: newShip.from,
      to: newShip.to,
      estimatedDelivery: newShip.estimatedDelivery,
      status: newShip.status,
      trackingUrl: `https://pennywiselogistics.online/#tracking/${trackingId}`
    }

    try{
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: newShip.receiverEmail,
          trackingId: trackingId,
          shipmentDetails: shipmentDetails
        })
      });
      const result = await res.json();
      if(result.success){
        console.log('Email sent successfully:', result);
        alert('Email notification sent successfully!');
      }else{
        console.error('Error sending email:', result);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email notification. Please try again later.');
    } 

    // await sendEmailNotification(newShip.receiverEmail, trackingId, shipmentDetails);
  };

  const updateTimeline = async (trackingId, newTimelineItem) => {
    const { data: shipmentData, error: shipmentError } = await supabase
      .from('Shipments')
      .select('timeline')
      .eq('id', trackingId)
      .maybeSingle();
    if(!shipmentData){
      console.error('No Shippment found for tracking ID:', trackingId)
      alert('Shipment not Found');
      return;
    }
    if (shipmentError) {
      console.error('Error fetching shipment timeline:', shipmentError);
      alert('Failed to fetch shipment timeline. Please try again.');
      return;
    }


    // console.log('TrackingId used in UpdateTimeline:', trackingId)
    // const existingTimeline = shipmentData.timeline || [];
    const existingTimeline = Array.isArray(shipmentData?.timeline) ? shipmentData.timeline : [];

    console.log('Adding ')
    const updatedTimeline = [...existingTimeline, newTimelineItem];

    const { data, error } = await supabase
      .from('Shipments')
      .update({
        timeline: updatedTimeline
      })
      .eq('id', trackingId)
      .select();
    if (error) {
      console.error('Error updating shipment timeline:', error);
      alert('Failed to update shipment timeline. Please try again.');
      return;
    }
    setShipments(prev => prev.map(shipment =>
      shipment.id === trackingId ? { ...shipment, timeline: data[0].timeline } : shipment
    ));
    // alert('Shipment timeline updated successfully!');
  };


  // Get all shipments from the database
  useEffect(() => {
    const fetchShipments = async () => {
      const { data, error } = await supabase.from('Shipments').select('*');
      if (error) {
        console.error('Error fetching shipments:', error);
      } else {
        setShipments(data);
        // console.log('Fetched shipments:', data);
      }
    };
    fetchShipments();
  }, []);

  // Get all users from the database
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('Users').select('*');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
        // console.log('Fetched users:', data);
      }
    };
    fetchUsers();
  }, []);

  // Handle user input changes for creating a new user
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShipment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // handle status update
  const handleStatusChange = async (id, newStatus) => {
    setEditStatus(prev => ({
      ...prev, [id]: newStatus
    }));
    const newTimelineItem = {
      status: newStatus,
      currentDate: new Date().toISOString().split('T')[0] ,
      completed: newStatus === 'Delivered'
    }

    const {error: statusError } = await supabase
      .from('Shipments')
      .update({ status: newStatus })
      .eq('id', id)
      .select();
    if (statusError) {
      alert('Failed to update shipment status. Please try again.');
      return;
    }

    setShipments(prev => prev.map(shipment =>
      shipment.id === id ? { ...shipment, status: newStatus } : shipment
    ));
    await updateTimeline(id, newTimelineItem)
    alert(`Shipment status updated to ${newStatus}`);
  };


  const userStats = [
    { label: 'Total Users', value: userStat.totalUsers, icon: 'ri-user-line', color: 'bg-blue-500' },
  ];

  const stats = [
    { label: 'Total Shipments', value: statss.totalShipments, icon: 'ri-truck-line', color: 'bg-blue-500' },
    { label: 'In Transit', value: statss.inTransit, icon: 'ri-road-map-line', color: 'bg-orange-500' },
    { label: 'Delivered', value: statss.delivered, icon: 'ri-check-line', color: 'bg-green-500' },
    { label: 'Processing', value: statss.processing, icon: 'ri-time-line', color: 'bg-yellow-500' }
  ];

  const deliveryStages = [
    'Package Created',
    'Dispatched',
    'In Transit',
    'Out for Delivery',
    'Delivered'
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
        >
          <i className="ri-logout-circle-line mr-2"></i>
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {userStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
        
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                activeTab === 'users'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Registered Users
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Shipments Overview
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                activeTab === 'register'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Add User
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                activeTab === 'create'
                  ? 'border-secondary text-secondary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Create Shipment
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'users' && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">All Registered Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Users</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Full Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">{user.email}</td>
                        <td className="py-4 px-4 text-sm font-medium text-slate-800">
                          {user.fullname || 'N/A'}
                        </td>

                        <td className="py-4 px-4 text-sm text-gray-600">{user.created_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">All Shipments</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Tracking ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Route</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((shipment) => {
                    const isEditing = editingShipmentId === shipment.id;
                    return (
                      <tr key={shipment.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-mono text-sm">{shipment.id}</td>
                        <td className="py-4 px-4">{shipment.receiverEmail}</td>
                        <td className="py-4 px-4 text-sm">
                          {isEditing ? (
                            <div className="flex flex-col gap-2">
                              <input
                                type="text"
                                value={editRoute.from}
                                onChange={e => setEditRoute(prev => ({ ...prev, from: e.target.value }))}
                                className="border border-gray-300 rounded px-2 py-1 text-sm mb-1"
                                placeholder="Current Location"
                              />
                              <input
                                type="date"
                                value={formatDate(editRoute.date)}
                                onChange={e => setEditRoute(prev => ({ ...prev, date: e.target.value }))}
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                                placeholder="Date"
                              />
                            </div>
                          ) : (
                            <div>
                              <div>{shipment.from}</div>
                              <div className="text-gray-500">→ {shipment.to}</div>
                              <div className="text-gray-500 text-xs">{shipment.currentDate}</div>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            shipment.status === 'In Transit' ? 'bg-orange-100 text-orange-800' :
                            shipment.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {shipment.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{shipment.created || shipment.currentDate}</td>
                        <td className="py-4 px-4 flex flex-col gap-2">
                          <select
                            value={shipment.status}
                            onChange={(e) => handleStatusChange(shipment.id, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 pr-8 mb-2"
                          >
                            <option value="Processing">Processing</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Out for Delivery">Out for Delivery </option>
                            <option value="Delivered">Delivered</option>
                          </select>
                          {isEditing ? (
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold"
                              onClick={() => handleSaveRoute(shipment.id)}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold"
                              onClick={() => handleEditRoute(shipment)}
                            >
                              Edit
                            </button>
                          )}

                          <div className="flex items-center gap-2">
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold"
                              onClick={() => handleDeleteRoute(shipment.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                   })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'register' && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Add User</h2>
              <form onSubmit={createUser} className="max-w-2xl">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullname"
                      value={newUser.fullname}
                      onChange={handleUserInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={newUser.email}
                      onChange={handleUserInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      placeholder="johndeo@gmail.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={newUser.password}
                      onChange={handleUserInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      placeholder="********"
                    />
                  </div>
                </div>
                

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-add-line mr-2"></i>
                  Add User
                </button>
              </form>
            </div>
          )}

          {activeTab === 'create' && (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-6">Create New Shipment</h2>
              <form onSubmit={createShipment} className="max-w-2xl">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recievers Name</label>
                    <input
                      type="text"
                      name="receiverName"
                      value={newShipment.receiverName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      placeholder="John Deo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Senders Name</label>
                    <input
                      type="text"
                      name="senderName"
                      value={newShipment.senderName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      placeholder="Micheal Leo"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Recievers Email</label>

                    <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm">
                      <option value="">Select a User</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.email}>
                          {user.email}
                        </option>
                      ))}
                    </select>

                    {/* <input
                      type="text"
                      name="receiverEmail"
                      value={newShipment.receiverEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      placeholder="receiver@example.com"
                    /> */}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Description</label>
                    <input
                      type="text"
                      name="description"
                      value={newShipment.description}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      placeholder="Electronics"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From (Current Location)</label>
                    <input
                      type="text"
                      name="from"
                      value={newShipment.from}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      placeholder="Shanghai Port"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">To (Arrival)</label>
                    <input
                      type="text"
                      name="to"
                      value={newShipment.to}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      placeholder="New York Port"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={newShipment.weight}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      placeholder="1000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Delivery</label>
                    <input
                      type="date"
                      name="estimatedDelivery"
                      value={newShipment.estimatedDelivery}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                

                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-add-line mr-2"></i>
                  Create Shipment
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}