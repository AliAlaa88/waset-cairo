import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { useGetTouristsGoingToGuideToursQuery } from '../../store/userSlice';

const ClientManagementContent = (props) => {
    //hard coded guide id 1 here.. should be replaced with current logged in guide id.
    const {data: clients, isFetching, isError} = useGetTouristsGoingToGuideToursQuery(1);

    //dummy data for initial testing
    // const [clientsDummy, setClientsDummy] = useState([
    //     { 
    //         id: 1, 
    //         fname: 'John',
    //         lname: 'Smith', 
    //         email: 'john@email.com', 
    //         phonenumber: '+1 (555) 123-4567',
    //         tripname: 'Cairo & Luxor Tour',
    //         startdate: 'January 15, 2025',
    //     },
    //     { 
    //         id: 2, 
    //         fname: 'Emily',
    //         lname: 'Davis', 
    //         email: 'emily@email.com', 
    //         phonenumber: '+1 (555) 987-6543',
    //         tripname: 'Nile River Cruise',
    //         startdate: 'February 5, 2025',
    //     },
    //     { 
    //         id: 3, 
    //         fname: 'Jason',
    //         lname: 'Williams', 
    //         email: 'jason@email.com', 
    //         phonenumber: '+1 (555) 246-8135',
    //         tripname: 'Red Sea & Sinai Adventure',
    //         startdate: 'March 20, 2025',
    //     }
    // ]);
    
    if(isFetching) return (<p>Loading...</p>);
    if(isError) return(<p>An error has occured!</p>);
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-amber-900">Client Management</h2>
                    <h6 className='text-amber-800 font-semibold'>Tourists on your upcoming tours</h6>
                </div>
            </div>

            {/* Clients List */}
            <div className="space-y-4">
                {clients?.length > 0 ? (
                    clients?.map((client) => (
                        <div 
                            key={client.id} 
                            className="border-b pb-4 last:border-b-0 hover:bg-amber-50 transition-colors duration-200 rounded-lg p-4"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-amber-100 p-3 rounded-full">
                                        <User className="text-amber-800" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-amber-900 text-lg">{client.fname} {client.lname}</h3>
                                        <div className="flex items-center space-x-2 text-gray-600 text-sm mt-1">
                                            <Mail size={16} />
                                            <span className="ml-5">{client.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-600 text-sm mt-1">
                                            <Phone size={16} />
                                            <span>{client.phonenumber}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center space-x-2 text-amber-800 mb-1">
                                        <MapPin size={16} />
                                        <span className="font-medium">{client.tripname}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-600">
                                        <Calendar size={16} />
                                        <span>{client.startdate.split("T")[0]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-6 text-gray-500">
                        No clients found!
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientManagementContent;