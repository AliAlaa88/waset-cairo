import React from 'react'

const SettingsContent = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Settings</h2>
            <div className="space-y-4">
                <div className="border-b pb-4">
                    <h3 className="font-semibold text-amber-800 mb-2">Profile Information</h3>
                    <p className="text-sm text-gray-600">Name: Michael Townley</p>
                    <p className="text-sm text-gray-600">Email: michael@email.com</p>
                    <br/>
                    <button className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-800 transition">
                        Edit Profile
                    </button>
                </div>
                <div>
                    <h3 className="font-semibold text-amber-800 mb-2">Account</h3>
                    <button className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-800 transition">
                        Change Password
                    </button>
                </div>
                <div>
                    <hr/><br/>
                    <button className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-800 transition">
                        Logout 
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsContent;
