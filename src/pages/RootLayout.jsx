import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
		<>
			<Navbar />
      <Outlet />
      {/* footer */}
		</>
	);
}

export default RootLayout;