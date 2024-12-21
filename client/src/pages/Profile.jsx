import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	User,
	Ticket,
	Star,
	Pyramid,
	Edit,
	Archive,
	Medal,
	Home,
	Settings,
	Briefcase,
} from "lucide-react";

import logo from "../assets/exploreEgy.png";
import PackageButton from "../components/PackageButton";
import EventButton from "../components/EventButton";
import ChangePasswordModal from "./ChangePasswordModal";

import { clearCredentials } from "../store/authSlice";
import { useGetTouristTourHistoryQuery } from "../store/tourSlice";
import { useGetTicketsQuery } from "../store/ticketSlice";
import {
	useGetCurrUserDataQuery,
	useGetTouristInsightsQuery,
	useGetTouristFavExperienceQuery,
} from "../store/userSlice";
import {
	useTouristLogoutMutation,
	useUpdatePasswordMutation,
} from "../store/registrationSlice";
import { useGetAvgRatingsOfTouristQuery } from "../store/feedbackSlice";

const Profile = () => {
	const id = useSelector((state) => state.auth.userInfo.id);
	const [passwordModalOpen, setPasswordModalOpen] = useState(false);
	const [updatePassword] = useUpdatePasswordMutation();
	const [touristLogout] = useTouristLogoutMutation();
	const [activeTab, setActiveTab] = useState("overview");

	const { data: profileData, isFetching } = useGetCurrUserDataQuery();
	const { data: myTickets, isFetching: ticketFetching} = useGetTicketsQuery();
	const { data: userInsights, isFetching: insightsFetching } =
		useGetTouristInsightsQuery();
	const { data: avgRatings, isFetching: avgRatingFetching} = useGetAvgRatingsOfTouristQuery();
	const { data: favExp, isFetching: favExpFetching } = useGetTouristFavExperienceQuery(); //still in progress..
	const { data: myTours, isFetching: myToursFetching } =
		useGetTouristTourHistoryQuery(id);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const handlePasswordChange = async ({ currentPassword, newPassword }) => {
		try {
			const res = await updatePassword({
				currPassword: currentPassword,
				newPassword: newPassword,
			}).unwrap();
			alert(res?.msg);
			setPasswordModalOpen(false);
		} catch (err) {
			if (err?.data?.msg === "Invalid Credentials!") {
				alert("Wrong current password");
			}
			console.log(err.data.msg || err);
		}
	};

	const handleLogout = async (event) => {
		event.preventDefault();
		try {
			const res = await touristLogout().unwrap();
			dispatch(clearCredentials({ ...res?.body }));
			navigate(`/`);
		} catch (err) {
			console.log(err?.data?.message || err.error);
		}
	};

	let renderOverview = () => {};
	let renderTickets = () => {};
	let renderRatings = () => {};
	let renderSettings = () => {};
	if (profileData) {
		renderOverview = () => (
			<>
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
								<p className="text-yellow-700">{profileData.language}</p>
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
						{insightsFetching ? (
							<p>Loading...</p>
						) : (
							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="font-bold text-yellow-800">Total Trips</span>
									<span className="text-yellow-700">
										{userInsights?.totaltrips}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="font-bold text-yellow-800">Total Spent</span>
									<span className="text-yellow-700">
										{userInsights?.totalspent} LE
									</span>
								</div>
								<div className="flex justify-between">
									<span className="font-bold text-yellow-800">
										Member Since
									</span>
									<span className="text-yellow-700">
										{userInsights?.membersince.split("T")[0]}
									</span>
								</div>
							</div>
						)}
					</div>

					{/* Favorite Experience */}
				<div className="bg-yellow-50 p-6 rounded-xl shadow-md">
					<h3 className="text-xl font-semibold text-yellow-900 mb-4 flex items-center">
						<Pyramid className="mr-2 text-yellow-600" />
						Favorite Experience
					</h3>
					{favExpFetching? <p>Loading...</p> :
					<div className="space-y-3">
						<div>
							<span className="font-bold text-yellow-800">Experience:</span>
							<p className="text-yellow-700">
								{favExp?.experiencename}
							</p>
						</div>
						<div>
							<span className="font-bold text-yellow-800">Date:</span>
							<p className="text-yellow-700">
								{favExp?.date.split("T")[0]}
							</p>
						</div>
						<div className="flex items-center">
							<span className="font-bold text-yellow-800 mr-2">Rating: {favExp?.highestrating}</span>
							<div className="flex">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										fill={`${i < Math.floor(favExp?.highestrating) ? "orange" : "gray"}`}
										className={`${
											i < Math.floor(favExp?.highestrating)
												? "text-yellow-500"
												: "text-gray-300"
										}`}
										size={20}
									/>
								))}
							</div>
						</div>
					</div>}
				</div>


				</div>
				{myToursFetching ? (
					<p>Loading...</p>
				) : (
					<div className="bg-yellow-50 p-6 rounded-xl shadow-md block">
						<h3 className="text-xl font-semibold text-yellow-900 mb-4 flex items-center">
							<Ticket className="mr-2 text-yellow-600" />
							My Tours
						</h3>
						<div className="space-y-4">
							{myTours?.map((tour) => (
								<div
									key={tour.id}
									className="bg-white p-4 rounded-lg border-l-4 border-yellow-500"
								>
									<div className="flex justify-between items-center">
										<div>
											<h4 className="font-bold text-yellow-900">
												{tour.destination}
											</h4>
											<p className="text-yellow-700">
												From: {tour.startdate.split("T")[0]}
											</p>
											<p className="text-yellow-700">
												To: {tour.enddate.split("T")[0]}
											</p>
										</div>
										<Link to={`feedback/${tour.id}`} className={`bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-400 transition ${new Date(tour.startdate) < new Date()? "" : "invisible"}`}>
											Give a Feedback
										</Link>
										<span
											className={`px-3 py-1 rounded-full text-sm ${
												tour.status === "assigned"
													? "bg-green-100 text-green-800"
													: tour.status === "pending"
													? "bg-yellow-100 text-yellow-800"
													: "bg-yellow-100 text-yellow-800 w-"
											}`}
										>
											{tour.status}
										</span>
										{tour.tourpackageid?
										<PackageButton
											packID={tour.tourpackageid}
											classN="flex items-center justify-center w-48 gap-4 bg-yellow-400 border rounded-lg shadow hover:bg-orange-400 transition duration-200 p-4"
										></PackageButton> :
										<EventButton
											eventid={tour.eventid}
											classN="flex items-center justify-center w-48 gap-4 bg-yellow-400 border rounded-lg shadow hover:bg-orange-400 transition duration-200 p-4"
										/>
										}
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</>
		);
		renderTickets = () => (
			<div className="bg-yellow-50 p-6 rounded-xl shadow-md">
				<h3 className="text-xl font-semibold text-yellow-900 mb-4 flex items-center">
					<Ticket className="mr-2 text-yellow-600" />
					My Tickets
				</h3>
				{ticketFetching? <p>Loading...</p>:
				<div className="space-y-4">
					{myTickets?.map((ticket, idx) => (
						<div
							key={idx}
							className="bg-white p-4 rounded-lg border-l-4 border-yellow-500"
						>
							<div className="flex justify-between items-center">
								<div>
									<h4 className="font-bold text-yellow-900">
										{ticket.name}
									</h4>
									<p className="text-yellow-700">{ticket.startdate.split("T")[0]}</p>
									<p className="text-yellow-700">Price: {ticket.price} LE</p>
								</div>
								<span
									className={`px-3 py-1 rounded-full text-sm ${
										new Date(ticket.startdate) < new Date()
											? "bg-green-100 text-green-800"
											: "bg-yellow-100 text-yellow-800"
									}`}
								>
									{new Date(ticket.startdate) < new Date()? "Completed" : "Upcoming"}
								</span>
							</div>
						</div>
					))}
				</div>}
			</div>
		);

		renderRatings = () => {
			if(avgRatingFetching) return (<p>Loading...</p>);
			const overallRating = (parseFloat(avgRatings[0].avgrating) + parseFloat(avgRatings[1].avgrating)) / 2.0;
			return(
			<div className="min-h-screen p-6">
				<div className="max-w-2xl mx-auto space-y-6">
					<div className="bg-white rounded-xl shadow-lg overflow-hidden">
						<div className="text-center p-6 border-b border-gray-100">
							<h2 className="text-2xl font-bold text-gray-800">
								Your Ratings
							</h2>
							<div className="mt-4 flex items-center justify-center gap-3">
								<span className="text-4xl font-bold text-amber-600">
									{overallRating.toFixed(1)}
								</span>
								<Star className="w-8 h-8 fill-amber-400 text-amber-400" />
							</div>
							<p className="text-gray-500 text-sm mt-2">
								Based on {parseFloat(avgRatings[0].ratingcount) + parseFloat(avgRatings[1].ratingcount)} reviews
							</p>
						</div>

						<div className="p-6">
							<div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0">
								<div className="flex items-center gap-3">
								<div className="p-2 bg-amber-50 rounded-lg">
									<Pyramid className="w-6 h-6 text-amber-600" />
								</div>
								<span className="font-medium text-2xl text-gray-700">Tours</span>
								</div>
								<div className="flex flex-col items-end">
								<div className="flex items-center gap-2">
									<span className="text-2xl font-bold text-amber-600">{avgRatings[0].avgrating.toFixed(1)}</span>
									<Star className="w-5 h-5 fill-amber-400 text-amber-400" />
								</div>
								<span className="text-sm text-gray-500">{avgRatings[0].ratingcount} reviews</span>
								</div>
							</div>

							<div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0">
								<div className="flex items-center gap-3">
								<div className="p-2 bg-amber-50 rounded-lg">
									<Briefcase className="w-6 h-6 text-amber-600" />
								</div>
								<span className="font-medium text-2xl text-gray-700">Guides</span>
								</div>
								<div className="flex flex-col items-end">
								<div className="flex items-center gap-2">
									<span className="text-2xl font-bold text-amber-600">{avgRatings[1].avgrating.toFixed(1)}</span>
									<Star className="w-5 h-5 fill-amber-400 text-amber-400" />
								</div>
								<span className="text-sm text-gray-500">{avgRatings[1].ratingcount} reviews</span>
								</div>
							</div>
						</div>

						<div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
							<p className="text-sm text-gray-600 text-center">
								Ratings updated daily
							</p>
						</div>
					</div>
				</div>
            </div>
		)};

		renderSettings = () => {
			return (
				<div className="bg-yellow-50 p-6 rounded-xl shadow-md">
					<h3 className="text-xl font-semibold text-yellow-900 mb-4 flex items-center">
						<Settings className="mr-2 text-yellow-600" />
						Settings
					</h3>
					<div className="space-y-4">
						<div className="border-b pb-4">
							<h3 className="font-semibold text-amber-800 mb-2">
								Profile Information
							</h3>
							<p className="text-sm text-gray-600">
								Name: {profileData.fname} {profileData.lname}{" "}
							</p>
							<p className="text-sm text-gray-600">
								Username: {profileData.username}
							</p>
							<p className="text-sm text-gray-600">
								Email: {profileData.email}
							</p>
							<br />
							<Link to="edit">
								<button className="bg-yellow-600 text-white px-4 py-2 rounded-full flex items-center mr-4 hover:bg-yellow-400">
									<Edit className="mr-2" size={20} /> Edit Profile
								</button>
							</Link>
						</div>

						<button
							onClick={() => setPasswordModalOpen(true)}
							className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-400 transition"
						>
							Change Password
						</button>

						<ChangePasswordModal
							isOpen={passwordModalOpen}
							onClose={() => setPasswordModalOpen(false)}
							onSubmit={handlePasswordChange}
						/>

						<div>
							<hr />
							<br />
							<button
								onClick={handleLogout}
								className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-400 transition"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			);
		};
	}

	return (
		<div className="min-h-screen bg-yellow-50">
			{/* Header */}
			{isFetching ? (
				<p>Loading...</p>
			) : (
				<>
					<div className="bg-gradient-to-r from-yellow-600 to-orange-500 text-white p-6 shadow-md">
						<div className="container mx-auto flex items-center">
							{/* Avatar */}
							<img
								src={logo}
								alt="Profile"
								className="w-24 h-24 rounded-full border-4 border-white object-cover mr-6"
							/>

							{/* Name and Actions */}
							<div className="flex-grow">
								<h1 className="text-3xl font-bold">{profileData?.fname} {profileData?.lname}</h1>
							</div>

							<div className="flex items-end">
								<Link to="/tourist-home">
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
				</>
			)}
		</div>
	);
};

export default Profile;
