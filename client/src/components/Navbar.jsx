import React from "react";
import { Link } from "react-router-dom";
import profileAvatar from "../assets/Nile with pyramids   with some Egyptian hieroglyphs and boat in the Nile.jpg";
import {
	TicketsPlane,
	CalendarDays,
	Pyramid,
	CircleUserRound,
	Package,
	Users
} from "lucide-react";
const Navbar = () => {
	return (
		<nav className="bg-gradient-to-r from-yellow-600 to-orange-500 text-white p-6 shadow-md">
			<div className="container mx-auto flex justify-evenly items-center">
				{/* Left Section with Icon */}
				<img
					src={profileAvatar}
					alt="Icon"
					className="w-12 h-12 rounded-full border-2 border-white object-cover mr-6"
				/>

				{/* Centered Tabs */}
				<div>
					<ul className="flex items-center w-full text-xl">
						<li className="text-gray-700 hover:text-white">
							<Link to="/home">
								<button className="bg-transparent text-white px-4 py-2 rounded-full flex items-center mr-4 hover:bg-yellow-400">
									<TicketsPlane className="mr-2" size={20} /> Tours
								</button>
							</Link>
						</li>
						<li className="text-gray-700 hover:text-white">
							<Link to="/home/tour-packs">
								<button className="bg-transparent text-white px-4 py-2 rounded-full flex items-center hover:bg-yellow-400">
									<Package className="mr-2" size={20} /> Tour Packs
								</button>
							</Link>
						</li>
						<li className="text-gray-700 hover:text-white">
							<Link to="/home/events">
								<button className="bg-transparent text-white px-4 py-2 rounded-full flex items-center hover:bg-yellow-400">
									<CalendarDays className="mr-2" size={20} /> Events
								</button>
							</Link>
						</li>
						<li className="text-gray-700 hover:text-white">
							<Link to="/home/monuments">
								<button className="bg-transparent text-white px-4 py-2 rounded-full flex items-center hover:bg-yellow-400">
									<Pyramid className="mr-2" size={20} /> Monuments
								</button>
							</Link>
						</li>
						<li className="text-gray-700 hover:text-white">
							<Link to="/home/groups">
								<button className="bg-transparent text-white px-4 py-2 rounded-full flex items-center hover:bg-yellow-400">
									<Users className="mr-2" size={20} /> Groups
								</button>
							</Link>
						</li>
					</ul>
				</div>

				{/* Right Section with Profile Link */}
				<div className="flex items-end text-xl">
					<Link to="/profile">
						<button className="bg-transparent text-white px-4 py-2 rounded-full flex items-center mr-4 hover:bg-yellow-400">
							<CircleUserRound className="mr-2" size={20} /> Profile
						</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
