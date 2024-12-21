import React, {useEffect} from 'react';
import { 
    LineChart, Line, BarChart, Bar, XAxis, YAxis, 
    CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
    Users, Ticket, Binoculars, DollarSign
} from 'lucide-react';
import { useGetOperatorDashboardQuery, useGetTopPerformingGuidesQuery, useGetTouristsDemographicsQuery} from '../store/userSlice';
import { useGetMostPopularPackQuery } from '../store/packSlice';


const OperatorDashboard = (props) => {

    const {data: dashboard, isFetching: dashboardFetching} = useGetOperatorDashboardQuery();
    const {data: popularPacks, isFetching: packsFetching} = useGetMostPopularPackQuery();
    const {data: topGuides, isFetching: guidesFetching} = useGetTopPerformingGuidesQuery();
    const {data: touristDemo, isFetching: touristsDemoFetching} = useGetTouristsDemographicsQuery();

    const StatCard = ({ icon: Icon, title, value, subtitle, color = 'amber' }) => (
        <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
            <div>
            <p className="text-gray-500 font-bold">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {subtitle && <p className="text-gray-500 text-[14px] mt-1">{subtitle}</p>}
            </div>
            <div className={`bg-${color}-100 p-3 rounded-lg`}>
                <Icon className={`h-6 w-6 text-${color}-600`} />
            </div>
        </div>
        </div>
    );

    if(dashboardFetching || packsFetching || guidesFetching || touristsDemoFetching) return(<p>Loading...</p>);
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header with Time Range Selector */}
                <div className="flex justify-center items-center">
                <h1 className="text-3xl font-bold text-amber-700">Hi {props.currUser?.fname}!</h1>
                </div>
                <p className='flex justify-center font-semibold text-gray-500 items-center'>Here's what's new!</p>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    icon={Users} 
                    title="Active Tourists" 
                    value={dashboard?.totalcustomers}
                    subtitle="Currently on tours" 
                />
                <StatCard 
                    icon={Binoculars} 
                    title="Active Guides" 
                    value={dashboard?.totalguides}
                    subtitle="Leading the Way" 
                    color="blue" 
                />
                <StatCard 
                    icon={DollarSign} 
                    title="Total Revenue" 
                    value={dashboard?.totalrevenue + " LE"}
                    subtitle="Driving Growth" 
                    color="green" 
                />
                <StatCard 
                    icon={Ticket} 
                    title="Active Tours" 
                    value={dashboard?.totaltours}
                    subtitle="Across all locations" 
                    color="" 
                />
                </div>

                {/* Revenue Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Most Popular Packages</h2>
                        <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={popularPacks}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                                <YAxis yAxisId="left" orientation="left" stroke="#F59E0B" domain={[0, Math.max(popularPacks.bookings)]}/>
                                <YAxis yAxisId="right" orientation="right" stroke="#10B981" domain={[0, Math.max(popularPacks.revenue)]}/>
                                <Tooltip />
                                <Bar yAxisId="left" dataKey="bookings" fill="#F59E0B" />
                                <Bar yAxisId="right" dataKey="revenue" fill="#10B981" />    
                            </BarChart>
                        </ResponsiveContainer>
                        </div>
                    </div>


                    <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-center mb-4">Top Performing Guides</h2>
                        <div className="grid grid-cols-3 gap-4 mb-2 font-semibold text-gray-600">
                            <div>Guide Name</div>
                            <div className="text-center">Avg. Rating</div>
                            <div className="text-center">Total Tours</div>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {topGuides?.map((guide, index) => (
                            <div
                                key={guide.id}
                                className={`flex items-center justify-between py-2 ${
                                index === 0 ? "bg-yellow-50" : ""
                                }`}
                            >
                                <div className="font-medium text-center">{guide.fname} {guide.lname}</div>
                                <div className="text-center">{guide.rating?.toFixed(2)}</div>
                                <div className="text-center">{guide.totaltours}</div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>



                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
                        <h2 className="text-lg font-semibold mb-4">Tourist Demographics & Spending</h2>
                        <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={touristDemo}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="age" label="Age"/>
                            <YAxis yAxisId="left" orientation="left" stroke="#F59E0B"/>
                            <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                            <Tooltip />
                            <Line yAxisId="left" type="monotone" dataKey="count" stroke="#F59E0B" name="Number of Tourists" />
                            <Line yAxisId="right" type="monotone" dataKey="avgspent" stroke="#10B981" name="Avg. Spending (LE)" />
                            </LineChart>
                        </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OperatorDashboard;