import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddReportMutation } from "../store/reportSlice";

function Report() {
    const{tourID} = useParams()
    const [discription, setdiscription] = useState('');
    const [addReport] = useAddReportMutation();
    const navigate = useNavigate();
	async function submit(event) {
		event.preventDefault();
		if (!discription) {
			alert("Please fill in all the required information");
		} else {
			try {
				const res = await addReport({
					description: discription,
					tourID,
				}).unwrap();
				navigate("../");
			} catch (error) {
				console.error("Failed to create Report:", error);
			}
		}
	}

    return (
        <div className = "report-contaner">
            
            <form className = "rpForm" onSubmit={submit}>
            <h2 className = "report-tital">Report</h2>
                <div className="rp-inputs">
                    <label>Description</label>
                    <textarea className = "rp-input"
                    type="text"
                    cols="18" rows="5"
                    placeholder="Description" 
                    value={discription} 
                    onChange={(e) => setdiscription(e.target.value)} 
                    />

                </div>
                <div className="rp-buttons">
                <button className="rp-cancleBtn" type="button" >Cancle</button>
                <button className="rp-submitBtn" type="submit">submit</button>
                </div>
            </form>
        </div>
    );
}

export default Report