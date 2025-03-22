import React, { useState } from "react";
import { submitClaim } from "../services/soapService";
import "./ClaimPage.css"; 

function ClaimPage() {
  const [claimData, setClaimData] = useState({
    lostItemName: "",  
    claimantName: "",
    claimantContact: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitClaim(claimData);
      console.log("Response:", response);
      setResponseMessage("Claim submitted successfully!");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setResponseMessage(`Failed to submit claim: ${error.message}`);
    }
  };

  return (
    <div className="claim-page-container">
      <form className="claim-form" onSubmit={handleSubmit}>
        <h2>Claim a Lost Item</h2>
        <p>Upon successful verification, we will contact you to arrange the retrieval of your claimed property.</p>
        <input
          type="text"
          className="claim-input"
          placeholder="Lost Item Name"
          value={claimData.lostItemName}
          onChange={(e) => setClaimData({ ...claimData, lostItemName: e.target.value })}
        />
        <input
          type="text"
          className="claim-input"
          placeholder="Your Name"
          value={claimData.claimantName}
          onChange={(e) => setClaimData({ ...claimData, claimantName: e.target.value })}
        />
        <input
          type="text"
          className="claim-input"
          placeholder="Your Contact"
          value={claimData.claimantContact}
          onChange={(e) => setClaimData({ ...claimData, claimantContact: e.target.value })}
        />
        <button type="submit" className="submit-button">Submit Claim</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
}

export default ClaimPage;
