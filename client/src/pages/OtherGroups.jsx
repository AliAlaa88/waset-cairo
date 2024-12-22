import { NavLink, Link } from "react-router-dom";
import { useJoinGroupMutation } from "../store/groupsSlice";
function OtherGroups({ data }) {
	const [joinGroup] = useJoinGroupMutation();
	const handleClick = (id) => {
		joinGroup(id);
		window.location.reload();
	};
	if(data.length === 0) return (<p className="text-center">No groups found!</p>)
	return (
		<div className="space-y-6">
				{data?.map((group) => (
				<div 
					key={group.id} 
					className="flex items-center bg-amber-50 rounded-xl p-6 shadow-md border border-gold-300 transition-all duration-300"
				>
					<div className="flex-grow">
						<h2 className="text-2xl text-yellow-700 mb-2">
							{group.name}
						</h2>
					</div>
					<Link to={`${group.id}`}>
						<button
						className="ml-6 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 hover:text-white transition-colors duration-300"
						>
							Open
						</button>
					</Link>
					<button onClick={() => handleClick(group.id)}
					className="ml-6 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 hover:text-white transition-colors duration-300"
					>
						Join
					</button>
				</div>))}
		</div>
	);
}

export default OtherGroups;
