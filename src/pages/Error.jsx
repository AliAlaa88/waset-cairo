import { Link } from "react-router-dom";

function ErrorPage() {

	let title = "An error occurred!";
	let message = "Something went wrong!";


	return (
		<div className="text-center font-bold text-3xl ">
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to={"/"}>Home</Link>
		</div>
	);
}

export default ErrorPage;
