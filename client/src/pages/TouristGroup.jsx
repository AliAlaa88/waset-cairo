import { Link } from "react-router-dom";
import MyTouristGroup from "./MyTouristGroup";
import OtherGroups from "./OtherGroups";
import { CirclePlus } from "lucide-react";
import {
	useGetGroupsQuery,
	useGetTouristGroupsQuery,
	useGetOtherGroupsQuery,
} from "../store/groupsSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
const TouristGroup = () => {
	const id = useSelector((state) => state.auth.userInfo.id);

	const { data: allGroups, isFetching } = useGetGroupsQuery();
	const { data: myGroups, isFetching: myGroupsFetch } =
		useGetTouristGroupsQuery(id);
	const { data: otherGroups, isFetching: otherGroupsFetch } =
		useGetOtherGroupsQuery(id);
	const [activeTab, setActiveTab] = useState("My Groups");

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


			{ isFetching || myGroupsFetch || otherGroupsFetch? <p>Loading...</p> : 
			<div className="container mx-auto mt-6">
				<div className="flex space-x-4 mb-6 justify-center">
					{["My Groups", "Other Groups"].map((tab) => (
						<button
							key={tab}
							className={`px-4 py-2 rounded-full capitalize flex items-center ${
								activeTab === tab
									? "bg-yellow-600 text-white"
									: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
							}`}
							onClick={() => setActiveTab(tab)}
						>
							{tab}
						</button>
					))}
				</div>

				<div>
					{activeTab === "My Groups" && <MyTouristGroup data={myGroups ?? []}/>}
					{activeTab === "Other Groups" && <OtherGroups data={otherGroups ?? []}/>}
				</div>
			</div>}


		</div>
	);
};

export default TouristGroup;
