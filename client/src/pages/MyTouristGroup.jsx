import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function MyTouristGroups() {
	const profileData = useSelector((state) => state.ui.profileData);
	const groups = useSelector((state) => state.ui.groups);
	const myGroups = profileData.groupIDs.map((id) =>
		groups.find((g) => g.id === id)
	);

	return (
		<>
			<h2 className="OGroup">My Tourist Groups</h2>
			<div className="group_to_join">
				<div className="LGroup">
					{myGroups.map((g) => (
						<div key={g.id} className="group-item">
							{g.name}
							<NavLink
								to={`${g.id}`}
								className="joinButton flex justify-center"
							>
								Open
							</NavLink>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
export default MyTouristGroups;
