import React from 'react'
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';
import { useGetGuideQuery } from '../../store/userSlice';
import { useGuideLogoutMutation } from '../../store/registrationSlice';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const SettingsContent = (props) => {
    const {data: guide, isFetching, isError} = useGetGuideQuery(props.userInfo.id);

    const [guideLogout] = useGuideLogoutMutation();
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

    if(isFetching) return(<p>Loading...</p>);
    if(isError) return(<p>An error has occured!</p>);
    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Settings</h2>
            <div className="space-y-4">
                <div className="border-b pb-4">
                    <h3 className="font-semibold text-amber-800 mb-2">Profile Information</h3>
                    <p className="text-sm text-gray-600">Name: {guide.guide.fname} {guide.guide.lname}</p>
                    <p className="text-sm text-gray-600">Username: {guide.guide.username}</p>
                    <p className="text-sm text-gray-600">Email: {guide.guide.email} </p>
                    <br/>
                    <Link>
						<button className="bg-amber-700 text-white px-4 py-2 rounded-full flex items-center mr-4 hover:bg-amber-800">
							<Edit className="mr-2" size={20} /> Edit Profile
						</button>
					</Link>
                </div>
                <div>
                    <h3 className="font-semibold text-amber-800 mb-2">Account</h3>
                    <button className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-800 transition">
                        Change Password
                    </button>
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
