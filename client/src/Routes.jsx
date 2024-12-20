import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import TourPacks from "./pages/TourPacks";
import TourPackDetails from "./pages/TourPackDetails";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Monuments from "./pages/Monuments";
import MonumentDetails from "./pages/MonumentDetails";
import ErrorPage from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import TouristGroup from "./pages/TouristGroup";
import TourGuideHomePage from "./pages/TourGuideHome";
import TourOperatorHomePage from "./pages/TourOperatorHome";
import MyPackes from "./pages/myPackeges";
import TouristGroupDetails from "./pages/TouristGroupDetails";
import CreateGroup from "./pages/CreateGroup";
import Tours from "./components/Tours";
import Report from "./pages/Report";
import TourGuideSign from "./pages/TourGuideSign";
import TourOperatorSign from "./pages/TourOperatorSign";
import InsertMonument from "./pages/InsertMonument";
import CreatePack from "./pages/CreatePacke";
import CreateEvent from "./pages/CreateEvent"
import EditProfileGuide from "./pages/EditProfileGuide";
import EditProfileOperator from "./pages/EditProfileOperator";
import CheckOut from "./pages/CheckOut";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />

				<Route path="/sign-up" element={<Signup />} />
				<Route path="/guide-sign" element={<TourGuideSign />} />
				<Route path="/operator-sign" element={<TourOperatorSign />} />
				<Route path="/tourist-home/profile">
					<Route index element={<Profile />} />
					<Route path="edit" element={<EditProfile />} />
				</Route>

				<Route path="tourist-home" element={<RootLayout />}>
					<Route index element={<Tours />} />
					<Route path="groups">
						<Route index element={<TouristGroup />} />
						<Route path=":id" element={<TouristGroupDetails />} />
						<Route path="create" element={<CreateGroup />} />
					</Route>

					<Route path="events">
						<Route index element={<Events />} />
						<Route path=":id" element={<EventDetails />} />
					</Route>

					<Route path="tour-packs">
						<Route index element={<TourPacks />} />
						<Route path=":id" element={<TourPackDetails />} />
					</Route>

					<Route path="monuments">
						<Route index element={<Monuments />} />
						<Route path=":id" element={<MonumentDetails />} />
					</Route>
				</Route>

				<Route path="guide-home" element={<TourGuideHomePage />} />
				<Route path="/guide-home/edit" element={<EditProfileGuide />} />
				<Route path="operator-home" element={<TourOperatorHomePage />} />
				<Route path="/operator-home/edit" element={<EditProfileOperator />} />
				<Route path="mypacks" element={<MyPackes />} />
				<Route path="report" element={<Report />} />
				<Route path="*" element={<ErrorPage />} />
				<Route path="insert-monument" element={<InsertMonument />} />
				<Route path="create-pack" element={<CreatePack />} />
				<Route path="create-event" element={<CreateEvent />} />
				<Route path="checkout" element={<CheckOut />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
