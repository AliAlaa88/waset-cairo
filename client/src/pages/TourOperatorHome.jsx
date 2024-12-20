import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Pyramid,
  Settings, 
  BarChart,
  Wand,
  Package,
  CalendarDays,
  Edit,
  X
} from 'lucide-react';
import logo from '../assets/8d01c511-6aae-4f11-9dfb-b4f3b8cd822a.webp'
import MyPackes from './myPackeges';
import MyEvents from './myEvents';
import { useDeleteTourMutation, useGetToursThatDidntStartQuery } from '../store/tourSlice';
import { useGetOperatorDashboardQuery, useGetCurrUserDataQuery, useUnbanTouristMutation } from '../store/userSlice';
import { useSelector } from 'react-redux';
import UnauthorizedPage from './UnauthorizedPage';
import { useOperatorLogoutMutation } from '../store/registrationSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCredentials } from '../store/authSlice';
import { useGetTouristsQuery, useGetGuidesQuery } from '../store/userSlice';
import { usePromoteTouristMutation, usePromoteGuideMutation, useBanTouristMutation } from '../store/userSlice';
import Lanch from './Lanch';


const TourOperatorHome = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeModal, setActiveModal] = useState({type: "", params:{}});
  const [activeTab, setActiveTab] = useState("Tourists");

  const {data: tours, isFetching: toursFetching, isError: tourError} = useGetToursThatDidntStartQuery();
  const {data: dashboard, isFetching: dashboardFetching, isError: dashboardError} = useGetOperatorDashboardQuery();
  const {data: currUser, isFetching: currUserFetching, isError: currUserError} = useGetCurrUserDataQuery();
  const {data: tourists, isFetching: touristsFetching, isError: touristsError} = useGetTouristsQuery();
  const {data: guides, isFetching: guidesFetching, isError: guidesError} = useGetGuidesQuery();
  const [promoteTourist] = usePromoteTouristMutation();
  const [promoteGuide] = usePromoteGuideMutation();
  const [banTourist] = useBanTouristMutation();
  const [unbanTourist] = useUnbanTouristMutation();
  const [deleteTour] = useDeleteTourMutation();

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
			console.log(err?.data?.message || err);
		}
	};


  const handlePromote = async (role, id) => {
    if(role === "Tourists"){
      try{
        await promoteTourist(id).unwrap();
      }
      catch(err){
        console.log(err);
      }
    }
    else if(role === "Guides"){
      try{
        await promoteGuide(id).unwrap();
      }
      catch(err){
        console.log(err);
      }
    }
    else return;
    alert('User has been promoted to an operator!');
    window.location.reload();
  }

  const handleBan = async (id) => {
    try{
      await banTourist(id).unwrap();
      alert('User has been banned successfully!');
      window.location.reload();
    }
    catch(err){
      console.log(err);
    }
  }

  const handleUnban = async (id) => {
    try{
      await unbanTourist(id).unwrap();
      alert('User has been unbanned successfully!');
      window.location.reload();
    }
    catch(err){
      console.log(err);
    }
  }

  const handleDeleteTour = async (id) =>{
    try{
      await deleteTour(id).unwrap();
      alert("Tour has been deleted successfully!");
      window.location.reload();
    }
    catch(err){
      console.log(err);
    }
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


  const showTourModal = (id) => {
    return(
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        {/*makes the background gray to give the modal effect*/}
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center bg-amber-100 rounded-full sm:mx-0 sm:size-10">
                    <Wand size={26} color='#B8860B'/>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold text-gray-900" id="modal-title">What’s Next for This Tour?</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Keep the tour fresh by updating its details, or remove it completely if it's no longer needed. The choice is yours!
                      </p>
                    </div>
                  </div>
                  <div onClick={() => setActiveModal({type: "", params:{}})} className="flex justify-end items-end ml-28 cursor-pointer hover:bg-slate-300 rounded-lg">
                    <X size={26}/>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button onClick={() => {handleDeleteTour(id)}} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 sm:ml-3 sm:w-auto">
                  Delete Tour
                </button>
                <button onClick={() => {}} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 sm:mt-0 sm:w-auto">
                  Edit Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };



  const showUserModal = (role, id, banned) => {
    return(
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        {/*makes the background gray to give the modal effect*/}
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="flex items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center bg-amber-100 rounded-full sm:mx-0 sm:size-10">
                    <Wand size={26} color='#B8860B'/>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="text-base font-semibold text-gray-900" id="modal-title">Manage User Permissions</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        What would you like to do with this user?
                      </p>
                    </div>
                  </div>
                  <div onClick={() => setActiveModal({type: "", params:{}})} className="flex justify-end items-end ml-28 cursor-pointer hover:bg-slate-300 rounded-lg">
                    <X size={26}/>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {role === "Tourists"? 
                <button onClick={() => {banned === '1'? handleUnban(id) : handleBan(id)}} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 sm:ml-3 sm:w-auto">
                  {banned === '1'? "Unban User" : "Ban User"}
                </button> : ""}
                <button onClick={() => {handlePromote(role, id)}} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 sm:mt-0 sm:w-auto">
                  Promote
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
            <h2 className="text-3xl font-bold text-amber-900 mb-6 text-center">Hi {currUser?.fname}!</h2>
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Dashboard Overview</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Total Tours', value: dashboard? dashboard[0].totaltours : 0, color: 'text-amber-700' },
                { title: 'Total Customers', value: dashboard? dashboard[0].totalcustomers : 0, color: 'text-amber-700' },
                { title: 'Total Revenue', value: (dashboard? dashboard[0].totalrevenue : 0) + " LE", color: 'text-amber-700' }
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
        if(touristsFetching || guidesFetching) return (<p>Loading...</p>);
        return (
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-amber-900 mb-6">User Management</h2>
            <div className="flex space-x-4 mb-6">
                {["Tourists", "Guides"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-full capitalize flex items-center ${
                    activeTab === tab
                      ? "bg-amber-600 text-white"
                      : "bg-amber-200 text-yellow-800 hover:bg-amber-500"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
                ))}
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-amber-100">
                  <tr key="columnname">
                    {['Name', 'Role', 'Email', 'Actions'].map(header => (
                      <th key={header} className="p-4 text-left text-amber-900">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(activeTab === "Tourists"? tourists : guides).map(user => (
                    <tr key={user.id} className="border-b hover:bg-amber-50">
                      <td className="p-4">{user.fname} {user.lname}</td>
                      <td className="p-4">{activeTab}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        <button onClick={() => {setActiveModal({type: "user", params: {id: user.id, role: activeTab, banned: user.banned || 0}})}} className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {activeModal.type === "user"? showUserModal(activeModal.params.role, activeModal.params.id, activeModal.params.banned) : ""}
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
              {tours?.map(tour => (
                <div 
                  key={tour.id} 
                  className="bg-white rounded-xl shadow-md p-6 border-2 border-amber-200 hover:scale-105 transition-transform"
                >
                  <h3 className="text-2xl font-bold text-amber-900 mb-4">{tour.name}</h3>
                  <div className="space-y-2 text-amber-800">
                    <p>Price: {tour.price} LE</p>
                    <p>Capacity: {tour.ticketcapacity}</p>
                    <p>Booked: {tour.bookedtickets}</p>
                    <button onClick={() => {setActiveModal({type: "tour", params: {id: tour.id}})}} className="w-full bg-amber-600 text-white py-2 rounded-md mt-4 hover:bg-amber-700">
                      Manage Tour
                    </button>
                  </div>
                </div>
              ))}
              {activeModal.type === "tour"? showTourModal(activeModal.params.id) : ""}
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
                <p className="text-sm text-gray-600">Name: {currUser?.fname}</p>
                <p className="text-sm text-gray-600">Username: {currUser?.username}</p> 
                <p className="text-sm text-gray-600">Email: {currUser?.email}</p>
                <br/>
                <Link to="edit">
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