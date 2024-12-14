import { useParams } from "react-router-dom";
import MonumentButton from "../components/MonumentButton";
import { useGetGroupQuery } from "../store/groupsSlice";
import { useGetMonumentQuery } from "../store/monumentSlice";
const TouristGroupDetails = () => {
	const { id } = useParams();
	const { data: group, isFetching } = useGetGroupQuery(id);

	return (
		<div className="p-6">
			{isFetching ? (
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
								<strong>Participants:</strong> {group.participantCount}
							</p>
						</div>
					</div>

					{/* {relatedMonument && (
						<div className="mt-8">
							<h3 className="text-2xl font-semibold text-center mb-4">
								Preffered Monument
							</h3>
							<div className="flex justify-evenly gap-4">
								<MonumentButton monument={relatedMonument} />
							</div>
						</div>
					)} */}
				</>
			)}
		</div>
	);
};

export default TouristGroupDetails;
