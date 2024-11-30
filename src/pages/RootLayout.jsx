import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
		<div>
			<Navbar />
			<Outlet />
			{/* footer */}
		</div>
	);
}

export default RootLayout;