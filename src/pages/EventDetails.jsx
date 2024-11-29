import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  return (
    <div>
      {id}
    </div>
  );
}

export default EventDetails;