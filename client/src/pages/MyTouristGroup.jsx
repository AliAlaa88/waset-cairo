import { NavLink } from "react-router-dom";
import { useLeaveGroupMutation } from "../store/groupsSlice";
function MyTouristGroups({ data }) {
	const [leaveGroup] = useLeaveGroupMutation();
	const handleClick = (id) => {
		leaveGroup(id);
		window.location.reload();
	};
	return (
		<>
			<h2 className="OGroup">My Tourist Groups</h2>
			<div className="group_to_join">
				<div className="LGroup">
					{data.map((g) => (
						<div key={g.id} className="group-item">
							{g.name}
							<div className="flex justify-center gap-6">
								<NavLink
									to={`${g.id}`}
									className="joinButton flex justify-center"
								>
									Open
								</NavLink>
								<NavLink
									className="joinButton flex justify-center"
									onClick={() => handleClick(g.id)}
								>
									Leave
								</NavLink>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
export default MyTouristGroups;
