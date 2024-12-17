import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
		<div className="min-h-screen bg-gradient-to-r text-yellow-800 bg-amber-100">
			<Navbar />
			<Outlet />
			{/* footer */}
		</div>
	);
}

export default RootLayout;