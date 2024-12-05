import { Link } from "react-router-dom";

const PackageButton = ({ pack, classN }) => {
	return (
		<Link to={`/home/tour-packs/${pack.id}`} className={classN}>
			<img
				src={pack.image}
				alt={pack.title}
				className="w-24 h-24 rounded-full"
			/>
			<h4 className="mt-2 text-lg font-medium text-gray-800">{pack.title}</h4>
			<p className="text-sm text-gray-600">{pack.shortDescription}</p>
		</Link>
	);
};

export default PackageButton;
