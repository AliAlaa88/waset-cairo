import React from 'react'

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

export default ClientManagementContent;
