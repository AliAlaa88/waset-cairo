import React from 'react'

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

export default NotificationsContent;
