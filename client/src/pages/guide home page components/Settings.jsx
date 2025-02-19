import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';
import { useGetGuideQuery } from '../../store/userSlice';
import { useGuideLogoutMutation } from '../../store/registrationSlice';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useUpdatePasswordMutation } from '../../store/registrationSlice';
import ChangePasswordModal from '../ChangePasswordModal';

const SettingsContent = (props) => {

    const [guideLogout] = useGuideLogoutMutation();
    const [updatePassword] = useUpdatePasswordMutation();
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async (event) => {
		event.preventDefault();
		try {
			const res = await guideLogout().unwrap();
			dispatch(clearCredentials({ ...res?.body }));
			navigate(`/`);
		} catch (err) {
			console.log(err?.data?.message || err);
		}
	};

    const handlePasswordChange = async ({currentPassword, newPassword}) => {
		try {
			const res = await updatePassword({ currPassword: currentPassword, newPassword: newPassword }).unwrap();
			alert(res?.msg);
			setPasswordModalOpen(false);
		} catch (err) {
			if (err?.data?.msg === "Invalid Credentials!") {
				alert("Wrong current password");
			}
			console.log(err.data.msg || err);
		}
	};

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Settings</h2>
            <div className="space-y-4">
                <div className="border-b pb-4">
                    <h3 className="font-semibold text-amber-800 mb-2">Profile Information</h3>
                    <p className="text-sm text-gray-600">Name: {props.guide.fname} {props.guide.lname}</p>
                    <p className="text-sm text-gray-600">Username: {props.guide.username}</p>
                    <p className="text-sm text-gray-600">Email: {props.guide.email} </p>
                    <br/>
                    <Link to="edit">
						<button className="bg-amber-700 text-white px-4 py-2 rounded-full flex items-center mr-4 hover:bg-amber-800">
							<Edit className="mr-2" size={20} /> Edit Profile
						</button>
					</Link>
                </div>
                <div>
                    <h3 className="font-semibold text-amber-800 mb-2">Account</h3>
                    <button onClick={() => setPasswordModalOpen(true)} className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-800 transition">
                        Change Password
                    </button>
                    <ChangePasswordModal
                        isOpen={passwordModalOpen}
                        onClose={() => setPasswordModalOpen(false)}
                        onSubmit={handlePasswordChange}
                    />
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
};

export default SettingsContent;
