import React, { useState, useEffect } from 'react';
import { 
  Clipboard, 
  Settings, 
  CalendarCheck, 
  Users, 
  Bell,
  History
} from 'lucide-react';

import PendingToursContent from './guide home page components/PendingTours';
import ToursHistoryContent from './guide home page components/ToursHistory';
import ClientManagementContent from './guide home page components/ClientManagement';
import SettingsContent from './guide home page components/Settings';
import UnauthorizedPage from './UnauthorizedPage';
import { useSelector } from 'react-redux';
import { useGetGuideQuery } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const TourGuideHome = () => {
  const [activeSection, setActiveSection] = useState('assignedTours');
  const {userInfo} = useSelector((state) => state.auth);
  const {data: guides, isFetching, isError} = useGetGuideQuery(userInfo.id);
  const navigate = useNavigate();

  if(!userInfo || !userInfo.role) return (<UnauthorizedPage/>);

  const sidebarItems = [
    { 
      id: 'assignedTours', 
      icon: <CalendarCheck className="w-5 h-5" />, 
      label: 'Assigned Tours' 
    },
    {
      id: 'tourHistory',
      icon: <History className='w-5 h-5'/>,
      label: 'Tours History'
    },
    { 
      id: 'clientManagement', 
      icon: <Users className="w-5 h-5" />, 
      label: 'Client Management' 
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
        return <PendingToursContent userInfo={userInfo}/>;
      case 'tourHistory':
        return <ToursHistoryContent userInfo={userInfo} />;
      case 'clientManagement':
        return <ClientManagementContent userInfo={userInfo} />;
      case 'settings':
        return <SettingsContent userInfo={userInfo} />;
      default:
        return <PendingToursContent userInfo={userInfo} />;
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

export default TourGuideHome;