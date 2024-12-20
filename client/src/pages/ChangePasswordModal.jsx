import {useState} from 'react'
import { Lock, X } from 'lucide-react';

const ChangePasswordModal = ({ isOpen, onClose, onSubmit }) => {

    const [currPassword, setCurrPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.({ currentPassword: currPassword, newPassword });
        setCurrPassword('');
        setNewPassword('');
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full relative animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                <X className="h-5 w-5" />
                </button>
                
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Change Password</h2>
                    <p className="text-gray-600 text-sm mb-6">
                        Please enter your current password and choose a new password.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={currPassword}
                                required
                                onChange={(e) => setCurrPassword(e.target.value)}
                                placeholder="Current Password"
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={newPassword}
                                required
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password"
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                            />
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium 
                                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 
                                transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium 
                                hover:bg-amber-700 transition-colors duration-200 focus:outline-none focus:ring-2 
                                focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!currPassword || !newPassword}
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordModal
