import React, { useState } from "react";
import { submitClaim } from "../services/soapService";
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';



function ClaimPage() {
  const [claimData, setClaimData] = useState({
    lostItemId: "",
    claimantName: "",
    claimantContact: "",
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await submitClaim(claimData);
      setResponse(res);
      setError(null);
    } catch (err) {
      setError("Failed to submit claim.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Claim a Lost Item</h2>

      <Card className="p-4">
        <Input 
          type="text" 
          placeholder="Lost Item ID" 
          onChange={(e) => setClaimData({ ...claimData, lostItemId: e.target.value })} 
        />
        <Input 
          type="text" 
          placeholder="Your Name" 
          onChange={(e) => setClaimData({ ...claimData, claimantName: e.target.value })} 
        />
        <Input 
          type="text" 
          placeholder="Your Contact Info" 
          onChange={(e) => setClaimData({ ...claimData, claimantContact: e.target.value })} 
        />

        <Button onClick={handleSubmit} className="mt-4">Submit Claim</Button>

        {response && <p className="text-green-500 mt-2">Claim Submitted Successfully</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </Card>
    </div>
  );
}

export default ClaimPage;
