import React, { useState } from 'react';
import { 
  Users, 
  Pyramid, 
  CreditCard, 
  Settings, 
  BarChart
} from 'lucide-react';
import logo from '../assets/8d01c511-6aae-4f11-9dfb-b4f3b8cd822a.webp'

//test data
const mockUsers = [
  { id: 1, name: 'John Doe', role: 'Tour Guide', email: 'john@email.com' },
  { id: 2, name: 'Smith Williams ', role: 'Operator', email: 'smith@email.com' }
];

const mockTours = [
  { 
    id: 1, 
    name: 'Pyramids of Giza Expedition', 
    price: 750, 
    capacity: 20, 
    currentBookings: 15 
  },
  { 
    id: 2, 
    name: 'Luxor Historical Journey', 
    price: 800, 
    capacity: 15, 
    currentBookings: 10 
  }
];

const TourOperatorHome = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const sections = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: <BarChart className="h-5 w-5" />
    },
    { 
      id: 'user-management', 
      name: 'User Management', 
      icon: <Users className="h-5 w-5" />
    },
    { 
      id: 'tour-management', 
      name: 'Tour Management', 
      icon: <Pyramid className="h-5 w-5" />
    },
    { 
      id: 'financials', 
      name: 'Financials', 
      icon: <CreditCard className="h-5 w-5" />
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: <Settings className="h-5 w-5" />
    }
  ];

  const renderSection = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">Hi {mockUsers[0].name}!</h2>
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Dashboard Overview</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Total Tours', value: '24', color: 'text-amber-700' },
                { title: 'Total Customers', value: '456', color: 'text-amber-700' },
                { title: 'Total Revenue', value: '45,678 LE', color: 'text-amber-700' }
              ].map((card, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-md border-2 border-amber-200 hover:scale-105 transition-transform"
                >
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">{card.title}</h3>
                  <p className={`text-4xl font-bold ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'user-management':
        return (
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-amber-900 mb-6">User Management</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-amber-100">
                  <tr>
                    {['Name', 'Role', 'Email', 'Actions'].map(header => (
                      <th key={header} className="p-4 text-left text-amber-900">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map(user => (
                    <tr key={user.id} className="border-b hover:bg-amber-50">
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.role}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <button className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'tour-management':
        return (
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-8 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-amber-900">Tour Management</h2>
              <button className="w-48 bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700">
                Create a Tour Package
              </button>
            </div>
            <br/>
            <div className="grid md:grid-cols-2 gap-6">
              {mockTours.map(tour => (
                <div 
                  key={tour.id} 
                  className="bg-white rounded-xl shadow-md p-6 border-2 border-amber-200 hover:scale-105 transition-transform"
                >
                  <h3 className="text-2xl font-bold text-amber-900 mb-4">{tour.name}</h3>
                  <div className="space-y-2 text-amber-800">
                    <p>Price: {tour.price} LE</p>
                    <p>Capacity: {tour.capacity}</p>
                    <p>Booked: {tour.currentBookings}</p>
                    <button className="w-full bg-amber-600 text-white py-2 rounded-md mt-4 hover:bg-amber-700">
                      Manage Tour
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );


      case 'settings':
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Settings</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-amber-800 mb-2">Profile Information</h3>
                <p className="text-sm text-gray-600">Name: {mockUsers[0].name}</p>
                <p className="text-sm text-gray-600">Email: michael@email.com</p>
                <br/>
                <button className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-800 transition">
                  Edit Profile
                </button>
              </div>
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">Account</h3>
                <button className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-800 transition">
                  Change Password
                </button>
              </div>
              <div>
              <hr/><br/>
              <button className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-800 transition">
                  Logout 
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-amber-50">
      {/*Sidebar*/}
      <div className="w-64 h-full bg-amber-800 text-white p-6 fixed">
        <div className="mb-10">
          <h1 className="flex items-center text-3xl font-bold text-amber-200 whitespace-nowrap"> 
            <img src={logo} className='w-10 rounded-full flex mr-2'/> 
            Waset Cairo
          </h1>
        </div>
        <nav className="space-y-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`
                w-full flex items-center p-3 rounded-md transition-colors 
                ${activeSection === section.id 
                  ? 'bg-amber-600' 
                  : 'hover:bg-amber-700'
                }
              `}
            >
              {section.icon}
              <span className="ml-3">{section.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-10 ml-64">
        {renderSection()}
      </main>
    </div>
  );
};

export default TourOperatorHome;