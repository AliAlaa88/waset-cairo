import { BrowserRouter, Routes, Route } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import TourPacks from "./pages/TourPacks";
import TourPackDetails from "./pages/TourPackDetails";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Monuments from "./pages/Monuments";
import MonumentDetails from "./pages/MonumentDetails";
import ErrorPage from "./pages/Error";
import Login from "./pages/Login";
import Signup from "./pages/signup";

function Router() {
  return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/up" element={<Signup />} />
				<Route path="/begin" element={<RootLayout />}>
					<Route index element={<Home />} />
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

				<Route path="*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
