import React, { useState } from "react";
import axios from "axios";

const ClaimForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    lostItemId: "",
    claimantName: "",
    claimantContact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8093/api/claims", formData);
      onSuccess();
    } catch (error) {
      console.error("Error submitting claim:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <h2 className="text-lg font-semibold">Claim a Lost Item</h2>
      <input
        type="text"
        name="lostItemId"
        placeholder="Lost Item ID"
        value={formData.lostItemId}
        onChange={handleChange}
        className="border p-2 rounded w-full my-2"
      />
      <input
        type="text"
        name="claimantName"
        placeholder="Your Name"
        value={formData.claimantName}
        onChange={handleChange}
        className="border p-2 rounded w-full my-2"
      />
      <input
        type="text"
        name="claimantContact"
        placeholder="Your Contact Info"
        value={formData.claimantContact}
        onChange={handleChange}
        className="border p-2 rounded w-full my-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Submit Claim
      </button>
    </form>
  );
};

export default ClaimForm;