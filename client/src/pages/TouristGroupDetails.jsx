import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MonumentButton from "../components/MonumentButton";

const TouristGroupDetails = () => {
	const { id } = useParams();
	const grps = useSelector((state) => state.ui.groups); // Assuming groups are in Redux state
	const group = grps.find((g) => g.id === parseInt(id));
	const monuments = useSelector((state) => state.ui.monuments); // Assuming monuments are also in Redux state
	const relatedMonuments = group.preferredMonumentIds.map((monId) =>
		monuments.find((mon) => mon.id === monId)
	);

	return (
		<div className="p-6">
			<h2 className="text-3xl font-bold text-center mb-4">{group.name}</h2>
			<div className="mx-auto w-full max-w-xl bg-white rounded-lg shadow-md overflow-hidden">
				<div className="p-6 text-black">
					{/* Group details */}
					<p className="text-lg font-semibold text-center mb-4">
						Common Language: {group.commonLanguage}
					</p>
					<p className="text-md font-semibold mb-2">
						<strong>Participants:</strong> {group.participantCount}
					</p>
				</div>
			</div>

			{relatedMonuments.length > 0 && (
				<div className="mt-8">
					<h3 className="text-2xl font-semibold text-center mb-4">
						Preffered Monuments
					</h3>
					<div className="flex justify-evenly gap-4">
						{relatedMonuments.map((monument) => (
							<MonumentButton key={monument.id} monument={monument} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default TouristGroupDetails;
