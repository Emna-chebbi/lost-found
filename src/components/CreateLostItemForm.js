import React, { useState } from "react";
import api from "../services/restService"; 

const CreateLostItemForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [dateLost, setDateLost] = useState("");
  const [status, setStatus] = useState("Lost");
  const [ownerNumber, setOwnerNumber] = useState(""); 
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newLostItem = {
        name,
        description,
        location,
        dateLost,
        status,
        ownerNumber: ownerNumber ? ownerNumber : null, 
      };

      
      const response = await api.post("/items", newLostItem);

      console.log("Lost item reported:", response.data);
      alert("Lost item reported successfully!");

      setMessage(""); 
      setName("");
      setDescription("");
      setLocation("");
      setDateLost("");
      setStatus("Lost");
      setOwnerNumber(""); 

    } catch (error) {
      console.error("Error reporting lost item:", error.response?.data || error.message);
      alert("Failed to report lost item.");
      setMessage("Failed to report lost item.");
    } finally {
      setLoading(false);
    }
  };

  
  const formStyles = {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
    width: "600px", 
    textAlign: "center",
    margin: "0 auto", 
  };

  const titleStyles = {
    color: "#15a5ff",
    fontWeight: "bold",
    fontSize: "2rem",
    marginBottom: "20px",
  };

  const labelStyles = {
    fontSize: "1.1rem",
    fontWeight: "bold",
    textAlign: "left",
    display: "block",
    marginBottom: "5px",
  };

  const inputStyles = {
    width: "90%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1rem",
  };

  const buttonStyles = {
    backgroundColor: "#2dd64f",
    color: "white",
    padding: "12px",
    width: "65%",
    border: "none",
    borderRadius: "18px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyles = {
    backgroundColor: "#1da411",
  };

  const messageStyles = {
    marginTop: "15px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#e74c3c",
  };

  
  const formLayoutStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between", 
    gap: "20px", 
  };

  const formFieldStyles = {
    width: "48%", 
  };

  return (
    <div style={formStyles}>
      <h2 style={titleStyles}>Report New Lost Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4" style={formLayoutStyles}>
        <div style={formFieldStyles}>
          <label style={labelStyles}>Lost Item Name</label>
          <input
            type="text"
            style={inputStyles}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={formFieldStyles}>
          <label style={labelStyles}>Description</label>
          <input
            type="text"
            style={inputStyles}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div style={formFieldStyles}>
          <label style={labelStyles}>Location</label>
          <input
            type="text"
            style={inputStyles}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div style={formFieldStyles}>
          <label style={labelStyles}>Date Lost</label>
          <input
            type="date"
            style={inputStyles}
            value={dateLost}
            onChange={(e) => setDateLost(e.target.value)}
            required
          />
        </div>

        <div style={formFieldStyles}>
          <label style={labelStyles}>Contact</label>
          <input
            type="number"
            style={inputStyles}
            value={ownerNumber}
            onChange={(e) => setOwnerNumber(e.target.value)}
            placeholder="Enter Number"
          />
        </div>

        <div style={{ width: "100%" }}> 
          <button
            type="submit"
            style={buttonStyles}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2dd64f")}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {message && <p style={messageStyles}>{message}</p>}
    </div>
  );
};

export default CreateLostItemForm;
