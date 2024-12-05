import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
		<div className="min-h-screen bg-yellow-50">
			<Navbar />
			<Outlet />
			{/* footer */}
		</div>
	);
}

export default RootLayout;