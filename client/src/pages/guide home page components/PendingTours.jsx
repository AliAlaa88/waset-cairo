import React, { useState } from 'react';
import { 
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useGetPendingToursByGuideQuery, useGetToursByGuideQuery, useAssignTourMutation, useDeleteTourMutation } from '../../store/tourSlice';

const PendingToursContent = (props) => {
    const {data: pendingTours, isFetching: pendingFetching, isError: pendingError} = useGetPendingToursByGuideQuery();
    const {data: assignedTours, isFetching: assignedFetching, isError: assignedError} = useGetToursByGuideQuery(props.userInfo.id);
    const [deleteTour] = useDeleteTourMutation();
    const [assignTour] = useAssignTourMutation();

    const handleAcceptTour = async (id) => {
        try{
            await assignTour(id).unwrap();
            window.location.reload();
        }
        catch(err){
            console.log(err.error);
        }
    };

    const handleDeclineTour = async (id) => {
        try{
            await deleteTour(id).unwrap();
            window.location.reload();
        }
        catch(err){
            console.log(err.error);
        }
    };

    if(pendingFetching || assignedFetching) return(<p>Loading...</p>);
    return (
        <div className="space-y-8">
            {/* Pending Tours Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-amber-900 mb-4">Pending Tours</h2>
                {pendingError    ? (
                    <p className="text-gray-600">No pending tours at the moment.</p>
                ) : (
                <div className="space-y-4">
                    {pendingTours.map((tour) => (
                    <div key={tour.id} className="border-b pb-3 last:border-b-0">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-xl text-amber-800">{tour.name}</h3>
                                <p className="text-sm font-bold text-gray-600">Date: {tour.startdate.split("T")[0]}</p>
                                <p className="text-sm text-gray-600">Tourists Coming: {tour.bookedtickets}</p>
                                <p className="text-sm text-gray-600">Ticket Capacity: {tour.ticketcapacity}</p>
                            </div>
                            <div className="flex space-x-3">
                                <button 
                                    onClick={() => handleAcceptTour(tour.id)}
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
                {assignedError ? (
                    <p className="text-gray-600">No tours have been assigned yet.</p>
                ) : (
                <div className="space-y-4">
                    {assignedTours?.map((tour) => (
                    <div key={tour.id} className="border-b pb-3 last:border-b-0">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold text-amber-800">{tour.tripname}</h3>
                                <p className="text-sm text-gray-600">Date: {tour.startdate.split("T")[0]}</p>
                                <p className="text-sm text-gray-600">Tourists Coming: {tour.totaltickets}</p>
                                <p className="text-sm text-gray-600">Ticket Capacity: {tour.ticketcapacity}</p>
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

export default PendingToursContent;