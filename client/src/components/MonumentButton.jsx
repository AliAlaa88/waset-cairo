import { Link } from "react-router-dom";

const MonumentButton = ({ monument }) => {
	return (
		<Link
			to={`/home/monuments/${monument.id}`}
			className="flex flex-col items-center bg-gray-100 border rounded-lg shadow hover:bg-gray-200 transition duration-200 p-4"
		>
			<img
				src={monument.image}
				alt={monument.title}
				className="w-24 h-24 rounded-full"
			/>
			<h4 className="mt-2 text-lg font-medium text-gray-800">
				{monument.title}
			</h4>
			<p className="text-sm text-gray-600">{monument.shortDescription}</p>
		</Link>
	);
};

export default MonumentButton;
