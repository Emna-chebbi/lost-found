import axios from "axios";

const SOAP_URL = "http://localhost:8095/ws/claims"; 

export const submitClaim = async (claimData) => {
  
  const xmlRequest = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://finalwebservice.pi.tn">
    <soapenv:Header/>
    <soapenv:Body>
      <ws:submitClaimRequest>
        <ws:lostItemName>${claimData.lostItemName}</ws:lostItemName> <!-- changed from lostItemId to lostItemName -->
        <ws:claimantName>${claimData.claimantName}</ws:claimantName>
        <ws:claimantContact>${claimData.claimantContact}</ws:claimantContact>
      </ws:submitClaimRequest>
    </soapenv:Body>
  </soapenv:Envelope>
`;

  try {
    const response = await axios.post(SOAP_URL, xmlRequest, {
      headers: { "Content-Type": "text/xml" },
    });

    
    console.log("SOAP response: ", response.data);
    return response.data;
  } catch (error) {
    console.error("SOAP request error:", error.response || error);
    throw error;
  }
};
