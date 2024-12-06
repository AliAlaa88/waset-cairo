import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function OtherGroups() {
const profileData = useSelector((state) => state.ui.profileData);
const groups = useSelector((state) => state.ui.groups);
const myGroups = groups.filter((g) => !profileData.groupIDs.includes(g.id));

	const handleClick = (id) => {
		// dispatch(joinGroup(id));
	}
return (
	<>
		<h2 className="OGroup">My Tourist Groups</h2>
		<div className="group_to_join">
			<div className="LGroup">
				{myGroups.map((g) => (
					<div key={g.id} className="group-item">
						{g.name}
						<NavLink
							className="joinButton flex justify-center"
							onClick={() => handleClick(g.id)}
						>
							Join
						</NavLink>
					</div>
				))}
			</div>
		</div>
	</>
);
}

export default OtherGroups;
