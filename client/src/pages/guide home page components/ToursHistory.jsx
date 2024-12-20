import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Star
} from 'lucide-react';
import { useGetToursByGuideQuery } from '../../store/tourSlice';

const ToursHistoryContent = (props) => {
    let {data: tourHistory, isFetching, isError} = useGetToursByGuideQuery(props.userInfo.id);
    tourHistory = tourHistory.filter((tour) => new Date(tour.enddate) < new Date()); //get only tours that has ended

    if(isFetching) return (<p>Loading...</p>);
    if(isError) return (<p>An error has occured!</p>);
    return (
    <div className="h-screen p-6">
        <div className="container mx-auto bg-white/80 rounded-2xl shadow-xl border border-gold-500 p-8">
            <h1 className="text-4xl text-gold-800 mb-8 text-center border-b-2 border-gold-500 pb-4">
                Tour History
            </h1>
            <div className="space-y-6">
            {tourHistory.length === 0? "No tours to show!" : tourHistory.map((tour) => (
                <div 
                    key={tour.id} 
                    className="flex items-center bg-amber-50 rounded-xl p-6 shadow-md border border-gold-300 hover:bg-amber-100 transition-all duration-300"
                >
                    <div className="flex-grow">
                        <h2 className="text-2xl text-yellow-700 mb-2">
                            {tour.tripname}
                        </h2>
                        <div className="grid grid-cols-3 gap-4 text-gold-600">
                        <p>
                            <span className="font-bold">Date:</span> {tour.startdate.split("T")[0]}
                        </p>
                        <p>
                            <span className="font-bold">Location:</span> {tour.meetinglocation}
                        </p>
                        <p>
                            <span className="font-bold">Duration:</span> {tour.duration} hours
                        </p>
                        <p>
                            <span className="font-bold">Group Size:</span> {tour.totaltickets}
                        </p>
                        <div className="flex items-center">
                            <span className="font-bold mr-2">Average Rating:</span>
                            <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                <Star 
                                    key={index} 
                                    className={`w-5 h-5 ${
                                    index < Math.round(tour.averagerating) 
                                        ? 'text-yellow-500' 
                                        : 'text-gray-300'
                                    }`}
                                    fill={index < Math.round(tour.averagerating) 
                                    ? '#F59E0B' 
                                    : 'none'}
                                />
                                ))}
                                <span className="ml-2 text-gold-600">
                                    ({tour.averagerating || 0})
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to="/report"
                    className="ml-6 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 hover:text-white transition-colors duration-300"
                >
                    Generate Report
                </Link>
                </div>
            ))}
            </div>
        </div>
    </div>
    );
};

export default ToursHistoryContent;
