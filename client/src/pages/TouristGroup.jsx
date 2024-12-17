import { Link } from "react-router-dom";
import MyTouristGroup from "./MyTouristGroup";
import OtherGroups from "./OtherGroups";
import { CirclePlus } from "lucide-react";
import { useGetGroupsQuery } from "../store/groupsSlice";
const TouristGroup = () => {
	const { data: allGroups, isFetching } = useGetGroupsQuery();
	// should get curr user id then get his enrolled groups and filter the allGroups array to my and others
	return (
		<div>
			<h2 className="text-center text-3xl font-bold mb-8 text-white">
				Tourist Groups
			</h2>
			<Link to="create">
				<button className="mx-auto text-white px-4 py-2 rounded-full flex items-center hover:bg-yellow-400">
					<CirclePlus className="mr-2" size={20} /> Create Group
				</button>
			</Link>
			{isFetching ? (
				<p>Loading...</p>
			) : (
				<>
					<MyTouristGroup data={allGroups} />
					<OtherGroups />
				</>
			)}
		</div>
	);
};

export default TouristGroup;
