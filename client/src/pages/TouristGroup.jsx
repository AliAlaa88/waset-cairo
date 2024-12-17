import { Link } from "react-router-dom";
import MyTouristGroup from "./MyTouristGroup";
import OtherGroups from "./OtherGroups";
import { CirclePlus } from "lucide-react";
import { useGetGroupsQuery } from "../store/groupsSlice";
const TouristGroup = () => {
	return (
		<div>
			<h2 className="text-center text-3xl font-bold mb-8 text-yellow-800">
				Tourist Groups
			</h2>
			<Link to="create">
				<button className="mx-auto bg-yellow-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-yellow-400">
					<CirclePlus className="mr-2" size={20} /> Create Group
				</button>
			</Link>
			<MyTouristGroup />
			<OtherGroups />
		</div>
	);
};

export default TouristGroup;
