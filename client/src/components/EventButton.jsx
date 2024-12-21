import { Link } from "react-router-dom";
import { useGetEventQuery } from "../store/eventSlice";

const EventButton = ({ eventid, classN }) => {
	const {data: event, isFetching} = useGetEventQuery(eventid);

	if(isFetching) return(<p>Loading...</p>);
	return (
		<Link to={`/home/events/${event?.id}`} className={classN}>
			{/* <img
				src={event?.image}
				alt={event?.name}
				className="w-24 h-24 rounded-full"
			/> */}
			<h4 className="mt-2 text-lg font-medium text-gray-800">{event?.name}</h4>
		</Link>
	);
};

export default EventButton;
