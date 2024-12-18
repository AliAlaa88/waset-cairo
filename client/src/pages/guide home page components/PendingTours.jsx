import React, { useState } from 'react';
import { 
  CheckCircle,
  XCircle
} from 'lucide-react';

const PendingToursContent = (props) => {
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

export default PendingToursContent;