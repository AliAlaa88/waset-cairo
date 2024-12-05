import React, { useState } from 'react';
import { 
  Clipboard, 
  Settings, 
  CalendarCheck, 
  Users, 
  CheckCircle,
  XCircle,
  Bell 
} from 'lucide-react';

const TourGuideHome = () => {
  const [activeSection, setActiveSection] = useState('assignedTours');

  const sidebarItems = [
    { 
      id: 'assignedTours', 
      icon: <CalendarCheck className="w-5 h-5" />, 
      label: 'Assigned Tours' 
    },
    { 
      id: 'clientManagement', 
      icon: <Users className="w-5 h-5" />, 
      label: 'Client Management' 
    },
    { 
      id: 'notifications', 
      icon: <Bell className="w-5 h-5" />, 
      label: 'Notifications' 
    },
    { 
      id: 'settings', 
      icon: <Settings className="w-5 h-5" />, 
      label: 'Settings' 
    }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'assignedTours':
        return <PendingToursContent />;
      case 'clientManagement':
        return <ClientManagementContent />;
      case 'notifications':
        return <NotificationsContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <PendingToursContent />;
    }
  };

  return (
    <div className="flex h-screen bg-amber-50">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-full bg-amber-900 text-white p-4 shadow-lg overflow-y-auto">
        <div className="flex items-center mb-8">
          <Clipboard className="w-8 h-8 mr-3 text-amber-300" />
          <h1 className="text-2xl font-bold text-amber-300">Tour Guide</h1>
        </div>
        <nav>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
                flex items-center w-full p-3 mb-2 rounded-lg transition-colors duration-200
                ${activeSection === item.id 
                  ? 'bg-amber-700 text-amber-200' 
                  : 'hover:bg-amber-800 text-amber-100'
                }
              `}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8 bg-amber-50 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};


const PendingToursContent = () => {
    const [pendingTours, setPendingTours] = useState([
      { 
        id: 1, 
        name: 'Pyramids of Giza Expedition', 
        date: '2024-07-15', 
        clients: 4,
        details: 'Full day tour exploring the Giza Pyramid Complex' 
      },
      { 
        id: 2, 
        name: 'Luxor Temple Historical Tour', 
        date: '2024-07-20', 
        clients: 6,
        details: 'In-depth exploration of Luxor Temple and surrounding historical sites' 
      }
    ]);
  
    const [assignedTours, setAssignedTours] = useState([]);
  
    const handleAcceptTour = (tour) => {
      setPendingTours(pendingTours.filter(t => t.id !== tour.id));
      setAssignedTours([...assignedTours, {...tour}]);
    };
  
    const handleDeclineTour = (tourId) => {
      setPendingTours(pendingTours.filter(t => t.id !== tourId));
    };
  
    return (
      <div className="space-y-8">
        {/* Pending Tours Section */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Pending Tours</h2>
          {pendingTours.length === 0 ? (
            <p className="text-gray-600">No pending tours at the moment.</p>
          ) : (
            <div className="space-y-4">
              {pendingTours.map((tour) => (
                <div key={tour.id} className="border-b pb-3 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-amber-800">{tour.name}</h3>
                      <p className="text-sm text-gray-600">Date: {tour.date}</p>
                      <p className="text-xs text-gray-500 mt-1">{tour.details}</p>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleAcceptTour(tour)}
                        className="text-green-600 hover:text-green-800 transition"
                        title="Accept Tour"
                      >
                        <CheckCircle className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={() => handleDeclineTour(tour.id)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Decline Tour"
                      >
                        <XCircle className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
  
        {/* Assigned Tours Section */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Assigned Tours</h2>
          {assignedTours.length === 0 ? (
            <p className="text-gray-600">No tours have been assigned yet.</p>
          ) : (
            <div className="space-y-4">
              {assignedTours.map((tour) => (
                <div key={tour.id} className="border-b pb-3 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-amber-800">{tour.name}</h3>
                      <p className="text-sm text-gray-600">Date: {tour.date}</p>
                      <p className="text-xs text-gray-500 mt-1">{tour.details}</p>
                    </div>
                    <span className="text-sm text-green-600">Assigned ✓</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

const ClientManagementContent = () => {
  const clients = [
    { id: 1, name: 'John Smith', email: 'john@email.com', tours: 2 },
    { id: 2, name: 'Emily Davis', email: 'emily@email.com', tours: 1 },
    { id: 3, name: 'Jason Williams', email: 'jason@email.com', tours: 3 }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-amber-900 mb-4">Client Management</h2>
      <div className="space-y-4">
        {clients.map((client) => (
          <div key={client.id} className="border-b pb-3 last:border-b-0 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-amber-800">{client.name}</h3>
              <p className="text-sm text-gray-600">{client.email}</p>
            </div>
            <span className="text-sm text-gray-700">Tours: {client.tours}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const NotificationsContent = () => {
  const notifications = [
    { id: 1, type: 'Tour', message: 'New tour assigned: Pyramids Expedition', time: '1 hour ago' },
    { id: 2, type: 'Client', message: 'Client feedback received', time: '3 hours ago' },
    { id: 3, type: 'System', message: 'New Updates', time: '6 hours ago' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-amber-900 mb-4">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="border-b pb-3 last:border-b-0 flex items-center space-x-3">
            <span className={`
              px-3 py-1 rounded-full text-xs
              ${notification.type === 'Tour' ? 'bg-blue-100 text-blue-800' : 
                notification.type === 'Client' ? 'bg-green-100 text-green-800' : 
                'bg-gray-100 text-gray-800'}
            `}>
              {notification.type}
            </span>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{notification.message}</p>
            </div>
            <span className="text-xs text-gray-500">{notification.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsContent = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-amber-900 mb-4">Settings</h2>
      <div className="space-y-4">
        <div className="border-b pb-4">
          <h3 className="font-semibold text-amber-800 mb-2">Profile Information</h3>
          <p className="text-sm text-gray-600">Name: Michael Townley</p>
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
};

export default TourGuideHome;