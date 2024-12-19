import { Link } from "react-router-dom";
import { useGetMonumentQuery } from "../store/monumentSlice";

const MonumentButton = ({ monumentID }) => {
	const { data: monument, isFetching } = useGetMonumentQuery(monumentID);
	return isFetching ? (
		<p>Looding...</p>
	) : (
		<>
			<Link
				to={`/tourist-home/monuments/${monument.id}`}
				className="flex flex-col items-center bg-gray-100 border rounded-lg shadow hover:bg-gray-200 transition duration-200 p-4"
			>
				<img
					src={
						monument.photos
							? monument.photos[0]
							: "https://th.bing.com/th/id/R.2351827d896995f1f6e12e89176f3d9b?rik=t258KJio4%2bo0PA&pid=ImgRaw&r=0"
					}
					alt={monument.title}
					className="w-24 h-24 rounded-full"
				/>
				<h4 className="mt-2 text-lg font-medium text-gray-800">
					{monument.name}
				</h4>
			</Link>
		</>
	);
};

export default MonumentButton;
