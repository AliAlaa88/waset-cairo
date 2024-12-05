import { Link } from "react-router-dom";

const EventButton = ({ event, classN }) => {
	return (
		<Link to={`/home/events/${event.id}`} className={classN}>
			<img
				src={event.image}
				alt={event.name}
				className="w-24 h-24 rounded-full"
			/>
			<h4 className="mt-2 text-lg font-medium text-gray-800">{event.title}</h4>
			<p className="text-sm text-gray-600">{event.shortDescription}</p>
		</Link>
	);
};

export default EventButton;
