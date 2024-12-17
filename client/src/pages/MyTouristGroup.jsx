import { NavLink } from "react-router-dom";
function MyTouristGroups({ data }) {
	return (
		<>
			<h2 className="OGroup">My Tourist Groups</h2>
			<div className="group_to_join">
				<div className="LGroup">
					{data.map((g) => (
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
