import { Link } from "react-router-dom";
import {
	Home,
} from "lucide-react";
function ErrorPage() {
	let title = "An error occurred!";
	let message = "Something went wrong!";

	return (
		<div className="flex flex-col justify-end text-center items-center font-bold text-3xl">
			<h1 className="mt-16">{title}</h1>
			<p className="mt-16">{message}</p>
			<Link to={"/home"}>
				<button className="bg-sky-800 text-white px-8 py-4 rounded-full flex items-center m-16 hover:bg-yellow-400">
					<Home className="mr-2" size={20} /> Home
				</button>
			</Link>
		</div>
	);
}

export default ErrorPage;
