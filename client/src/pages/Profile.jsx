import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
	User,
	Ticket,
	Star,
	Pyramid,
	Edit,
	Archive,
	Medal,
	Home,
	Settings
} from "lucide-react";


const Profile = () => {
	const [activeTab, setActiveTab] = useState("overview");

	const profileData = useSelector((state) => state.ui.profileData);


	const renderOverview = () => (
		<div className="grid md:grid-cols-3 gap-6">
			{/* Personal Info */}
			<div className="bg-yellow-50 p-6 rounded-xl shadow-md">
				<h3 className="text-xl font-semibold text-yellow-900 mb-4 flex items-center">
					<User className="mr-2 text-yellow-600" />
					Personal Info
				</h3>
				<div className="space-y-3">
					<div>
						<span className="font-bold text-yellow-800">Nationality:</span>
						<p className="text-yellow-700">{profileData.nationality}</p>
					</div>
					<div>
						<span className="font-bold text-yellow-800">Languages:</span>
						<p className="text-yellow-700">
							{profileData.languages.join(", ")}
						</p>
					</div>
					<div>
						<span className="font-bold text-yellow-800">Bio:</span>
						<p className="text-yellow-700 italic">{profileData.bio}</p>
					</div>
				</div>
			</div>

			{/* Account Insights */}
			<div className="bg-yellow-50 p-6 rounded-xl shadow-md">
				<h3 className="text-xl font-semibold text-yellow-900 mb-4 flex items-center">
					<Archive className="mr-2 text-yellow-600" />
					Account Insights
				</h3>
				<div className="space-y-3">
					<div className="flex justify-between">
						<span className="font-bold text-yellow-800">Total Trips</span>
						<span className="text-yellow-700">
							{profileData.accountInsights.totalTrips}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="font-bold text-yellow-800">Total Spent</span>
						<span className="text-yellow-700">
							{profileData.accountInsights.totalSpent}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="font-bold text-yellow-800">Member Since</span>
						<span className="text-yellow-700">
							{profileData.accountInsights.memberSince}
						</span>
					</div>
					<button className="bg-yellow-600 px-4 py-2 mx-auto rounded-full flex items-center text-white hover:bg-yellow-400">
						Show All Trips
					</button>
				</div>
			</div>

			{/* Favorite Experience */}
			<div className="bg-yellow-50 p-6 rounded-xl shadow-md">
				<h3 className="text-xl font-semibold text-yellow-900 mb-4 flex items-center">
					<Pyramid className="mr-2 text-yellow-600" />
					Favorite Experience
				</h3>
				<div className="space-y-3">
					<div>
						<span className="font-bold text-yellow-800">Experience:</span>
						<p className="text-yellow-700">
							{profileData.favoriteExperience.name}
						</p>
					</div>
					<div>
						<span className="font-bold text-yellow-800">Date:</span>
						<p className="text-yellow-700">
							{profileData.favoriteExperience.date}
						</p>
					</div>
					<div className="flex items-center">
						<span className="font-bold text-yellow-800 mr-2">Rating:</span>
						<div className="flex">
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className={`${
										i < profileData.favoriteExperience.rating
											? "text-yellow-500"
											: "text-gray-300"
									}`}
									size={20}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderTickets = () => (
		<div className="bg-yellow-50 p-6 rounded-xl shadow-md">
			<h3 className="text-xl font-semibold text-yellow-900 mb-4 flex items-center">
				<Ticket className="mr-2 text-yellow-600" />
				My Tickets
			</h3>
			<div className="space-y-4">
				{profileData.tickets.map((ticket) => (
					<div
						key={ticket.id}
						className="bg-white p-4 rounded-lg border-l-4 border-yellow-500"
					>
						<div className="flex justify-between items-center">
							<div>
								<h4 className="font-bold text-yellow-900">
									{ticket.destination}
								</h4>
								<p className="text-yellow-700">{ticket.date}</p>
							</div>
							<span
								className={`px-3 py-1 rounded-full text-sm ${
									ticket.status === "Completed"
										? "bg-green-100 text-green-800"
										: ticket.status === "Upcoming"
										? "bg-blue-100 text-blue-800"
										: "bg-yellow-100 text-yellow-800"
								}`}
							>
								{ticket.status}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);

	const renderRatings = () => (
		<div className="bg-yellow-50 p-6 rounded-xl shadow-md">
			<h3 className="text-xl font-semibold text-yellow-900 mb-4 flex items-center">
				<Medal className="mr-2 text-yellow-600" />
				Ratings
			</h3>
			<div className="space-y-4">
				<div className="flex justify-between items-center">
					<span className="font-bold text-yellow-800">Overall Rating</span>
					<div className="flex items-center">
						<Star className="text-yellow-500 mr-1" />
						<span className="text-yellow-700">
							{profileData.ratings.overall}
						</span>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="font-bold text-yellow-800">Tour Guides</span>
					<div className="flex items-center">
						<Star className="text-yellow-500 mr-1" />
						<span className="text-yellow-700">
							{profileData.ratings.tourGuides}
						</span>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="font-bold text-yellow-800">Experiences</span>
					<div className="flex items-center">
						<Star className="text-yellow-500 mr-1" />
						<span className="text-yellow-700">
							{profileData.ratings.experiences}
						</span>
					</div>
				</div>
			</div>
		</div>
	);


	const renderSettings = () => {
		return(
		<div className="bg-yellow-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-yellow-900 mb-4 flex items-center">
				<Settings className="mr-2 text-yellow-600" />
				Settings
			</h3>
            <div className="space-y-4">
            	<div className="border-b pb-4">
                	<h3 className="font-semibold text-amber-800 mb-2">Profile Information</h3>
                	<p className="text-sm text-gray-600">Name: saif </p>
                	<p className="text-sm text-gray-600">Email: saif@email.com</p>
                	<br/>
                	<Link to="edit">
						<button className="bg-yellow-600 text-white px-4 py-2 rounded-full flex items-center mr-4 hover:bg-yellow-400">
							<Edit className="mr-2" size={20} /> Edit Profile
						</button>
					</Link>
            	</div>
            	<div>
                	<h3 className="font-semibold text-amber-800 mb-2">Account</h3>
                	<button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-400 transition">
            			Change Password
                	</button>
            	</div>
            	<div>
            		<hr/><br/>
            		<button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-400 transition">
            			Logout 
                	</button>
            	</div>
            </div>
        </div>	
		);
	};

	return (
		<div className="min-h-screen bg-yellow-50">
			{/* Header */}
			<div className="bg-gradient-to-r from-yellow-600 to-orange-500 text-white p-6 shadow-md">
				<div className="container mx-auto flex items-center">
					{/* Avatar */}
					<img
						src={profileData.avatar}
						alt="Profile"
						className="w-24 h-24 rounded-full border-4 border-white object-cover mr-6"
					/>

					{/* Name and Actions */}
					<div className="flex-grow">
						<h1 className="text-3xl font-bold">{profileData.name}</h1>
					</div>

					<div className="flex items-end">
						<Link to="/home">
							<button className="bg-transparent text-white px-4 py-2 rounded-full flex items-center mr-4 hover:bg-yellow-400">
								<Home className="mr-2" size={20} /> Home
							</button>
						</Link>
					</div>
				</div>
			</div>

			{/* Navigation Tabs */}
			<div className="container mx-auto mt-6">
				<div className="flex space-x-4 mb-6">
					{["overview", "tickets", "ratings", "settings"].map((tab) => (
						<button
							key={tab}
							className={`px-4 py-2 rounded-full capitalize flex items-center ${
								activeTab === tab
									? "bg-yellow-500 text-white"
									: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
							}`}
							onClick={() => setActiveTab(tab)}
						>
							{tab}
						</button>
					))}
				</div>

				<div>
					{activeTab === "overview" && renderOverview()}
					{activeTab === "tickets" && renderTickets()}
					{activeTab === "ratings" && renderRatings()}
					{activeTab === "settings" && renderSettings()}
				</div>
			</div>
		</div>
	);
};

export default Profile;
