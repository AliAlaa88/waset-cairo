import { useParams } from "react-router-dom";

const MonumentDetails = () => {
	const { id } = useParams();
	return <div>{id}</div>;
};

export default MonumentDetails;
