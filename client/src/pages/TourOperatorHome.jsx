import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Pyramid,
  Settings, 
  BarChart,
  Wand,
  Package,
  CalendarDays,
  Edit
} from 'lucide-react';
import logo from '../assets/8d01c511-6aae-4f11-9dfb-b4f3b8cd822a.webp'
import MyPackes from './myPackeges';
import MyEvents from './myEvents';
import { useGetToursQuery } from '../store/tourSlice';
import { useGetTouristsQuery } from '../store/userSlice';
import { useSelector } from 'react-redux';
import UnauthorizedPage from './UnauthorizedPage';
import { useOperatorLogoutMutation } from '../store/registrationSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCredentials } from '../store/authSlice';

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
  const [activeModal, setActiveModal] = useState("");

  const {data: tours, isFetching: toursFetching, isError: tourError} = useGetToursQuery();
  const {data: tourists, isFetching: touristFetching, isError: touristError} = useGetTouristsQuery();
  const {userInfo} = useSelector((state) => state.auth);

  const [operatorLogout] = useOperatorLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (event) => {
		event.preventDefault();
		try {
			const res = await operatorLogout().unwrap();
			dispatch(clearCredentials({ ...res?.body }));
			navigate(`/`);
		} catch (err) {
			console.log(err?.data?.message || err.error);
		}
	};

  const tourModalInfo = {
    title: "What’s Next for This Tour?",
    text: "Keep the tour fresh by updating its details, or remove it completely if it's no longer needed. The choice is yours!",
    button1: "Delete Tour",
    button2: "Edit Tour"
  }

  const userModalInfo = {
    title: "Manage User Permissions",
    text: "What would you like to do with this user?",
    button1: "Ban User",
    button2: "Promote"
  }

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
      id: 'packages', 
      name: 'My Tour Packages', 
      icon: <Package className="h-5 w-5" />
    },
    {
      id: 'events',
      name: 'My Events',
      icon: <CalendarDays className='h-5 w-5'/>
    },
    { 
      id: 'settings', 
      name: 'Settings', 
      icon: <Settings className="h-5 w-5" />
    }
  ];


  const showModal = (modalInfo) => {
    return(
      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        {/*makes the background gray to give the modal effect*/}
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mx-auto flex size-12 shrink-0 items-center justify-center bg-amber-100 rounded-full sm:mx-0 sm:size-10">
                    <Wand size={26} color='#B8860B'/>
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 class="text-base font-semibold text-gray-900" id="modal-title">{modalInfo.title}</h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        {modalInfo.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button onClick={() => {setActiveModal("")}} type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 sm:ml-3 sm:w-auto">
                  {modalInfo.button1}
                </button>
                <button onClick={() => {setActiveModal("")}} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 sm:mt-0 sm:w-auto">
                  {modalInfo.button2}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };



  const renderSection = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">Hi {mockUsers[0].name}!</h2>
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Dashboard Overview</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Total Tours', value: tours?.length, color: 'text-amber-700' },
                { title: 'Total Customers', value: tourists?.length, color: 'text-amber-700' },
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
                        <button onClick={() => {setActiveModal("user")}} className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                  {activeModal === "user"? showModal(userModalInfo) : ""}
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
                    <button onClick={() => {setActiveModal("tour")}} className="w-full bg-amber-600 text-white py-2 rounded-md mt-4 hover:bg-amber-700">
                      Manage Tour
                    </button>
                  </div>
                </div>
              ))}
              {activeModal === "tour"? showModal(tourModalInfo) : ""}
            </div>
          </div>
        );

      case 'packages':
        return(
          <MyPackes/>
        );

      case 'events':
        return(
          <MyEvents/>
        );
      
      case 'settings':
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Settings</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-amber-800 mb-2">Profile Information</h3>
                <p className="text-sm text-gray-600">Name: {mockUsers[0].name}</p>
                <p className="text-sm text-gray-600">Email: {mockUsers[0].email}</p>
                <br/>
                <Link>
								  <button className="bg-amber-700 text-white px-4 py-2 rounded-full flex items-center mr-4 hover:bg-amber-800">
								  <Edit className="mr-2" size={20} /> Edit Profile
								</button>
							</Link>
              </div>
              <div>
                <h3 className="font-semibold text-amber-800 mb-2">Account</h3>
                <button className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-800 transition">
                  Change Password
                </button>
              </div>
              <div>
              <hr/><br/>
              <button onClick={handleLogout} className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-800 transition">
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

  if(!userInfo || userInfo.role != "operator") return <UnauthorizedPage/>
  
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