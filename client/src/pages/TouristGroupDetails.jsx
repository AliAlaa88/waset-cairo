import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MonumentButton from "../components/MonumentButton";
import PackageButton from "../components/PackageButton";
import {
	useGetGroupMembersQuery,
	useGetGroupQuery,
	useDeleteGroupMutation,
} from "../store/groupsSlice";
import { useGetPacksQuery } from "../store/packSlice";

const TouristGroupDetails = () => {
	const { id } = useParams();
	const { data: group, isFetching } = useGetGroupQuery(id);
	const { data: packs, isFetching: packsFetching } = useGetPacksQuery();
	const { data: groupMembers, isFetching: membersFetching } =
		useGetGroupMembersQuery(id);
	const [deleteGroup] = useDeleteGroupMutation();
	const { userInfo } = useSelector((state) => state.auth);
	console.log(packs);
	const navigate = useNavigate();

	const handleDeleteGroup = async (e) => {
		e.preventDefault();
		try {
			const res = await deleteGroup(id).unwrap();
			navigate("../");
		} catch (error) {
			console.error("Failed to delete group:", error);
		}
	};

	return (
		<div className="p-6">
			{isFetching || membersFetching || packsFetching ? (
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
								<strong>Participants:</strong> {groupMembers?.length || 0}
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
					{packs && packs.length > 0 && (
						<div className="mt-8">
							<h3 className="text-2xl font-semibold text-center mb-4">
								Available Packages
							</h3>
							<div className="flex flex-wrap justify-evenly gap-4">
								{packs.map(
									(pack) =>
										pack.monumentids.includes(group.prefferedmonument) && (
											<PackageButton
												key={pack.id}
												packID={pack.id}
												classN="flex items-center gap-4 bg-yellow-500 border rounded-lg shadow hover:bg-orange-400 transition duration-200 p-4"
											/>
										)
								)}
							</div>
						</div>
					)}
					{group.creatorid == userInfo.id && (
						<div className="mt-8 flex justify-center">
							<button
								onClick={handleDeleteGroup}
								className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
							>
								Delete Group
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default TouristGroupDetails;
