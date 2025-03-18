import axios from "axios";

const SOAP_URL = "http://localhost:8095/ws"; // Adjust to your SOAP endpoint

export const submitClaim = async (claimData) => {
  const xmlRequest = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://service.example.com/">
      <soapenv:Header/>
      <soapenv:Body>
        <ws:ClaimLostItem>
          <ws:lostItemId>${claimData.lostItemId}</ws:lostItemId>
          <ws:claimantName>${claimData.claimantName}</ws:claimantName>
          <ws:claimantContact>${claimData.claimantContact}</ws:claimantContact>
        </ws:ClaimLostItem>
      </soapenv:Body>
    </soapenv:Envelope>
  `;

  try {
    const response = await axios.post(SOAP_URL, xmlRequest, {
      headers: { "Content-Type": "text/xml" },
    });
    return response.data;
  } catch (error) {
    console.error("SOAP request error:", error);
    throw error;
  }
};
