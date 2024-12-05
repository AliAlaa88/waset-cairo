import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
		<div className="min-h-screen bg-gradient-to-r text-white from-sky-500 to-blue-600">
			<Navbar />
			<Outlet />
			{/* footer */}
		</div>
	);
}

export default RootLayout;