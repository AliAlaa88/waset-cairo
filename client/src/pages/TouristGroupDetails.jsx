import { useParams } from "react-router-dom";
import MonumentButton from "../components/MonumentButton";
import { useGetGroupMembersQuery, useGetGroupQuery } from "../store/groupsSlice";
const TouristGroupDetails = () => {
	const { id } = useParams();
	const { data: group, isFetching } = useGetGroupQuery(id);
	const { data: groupMembers, isFetching: membersFetching } = useGetGroupMembersQuery(id);
	return (
		<div className="p-6">
			{isFetching || membersFetching ? (
				<div>Loading...</div>
			) : (
				<>
					<h2 className="text-3xl font-bold text-center mb-4">{group.name}</h2>
					<div className="mx-auto w-full max-w-xl bg-white rounded-lg shadow-md overflow-hidden">
						<div className="p-6 text-black">
							{/* Group details */}
							<p className="text-lg font-semibold text-center mb-4">
								Common Language: {group.commonlanguage}
							</p>
							<p className="text-md font-semibold mb-2">
								<strong>Participants:</strong> {groupMembers.length}
							</p>
						</div>
					</div>

					{group && group.prefferedmonument && (
						<div className="mt-8">
							<h3 className="text-2xl font-semibold text-center mb-4">
								Preffered Monument
							</h3>
							<div className="flex justify-evenly gap-4">
								<MonumentButton monumentID={group.prefferedmonument} />
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default TouristGroupDetails;
