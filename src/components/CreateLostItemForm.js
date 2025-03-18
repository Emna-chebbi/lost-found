import React, { useState } from "react";
import axios from "../services/restService"; // Import the axios instance

const CreateLostItemForm = () => {
  // State to store form values
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [dateLost, setDateLost] = useState("");
  const [status, setStatus] = useState("Lost"); // Default status as "Lost"
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // For handling loading state

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if form fields are valid before submission
    if (!name || !description || !location || !dateLost) {
      setMessage("Please fill all the fields.");
      return;
    }

    // Prepare the data to send to the server
    const newItem = {
      name,
      description,
      location,
      dateLost,
      status,
    };

    setLoading(true); // Set loading to true when submitting the form
    setMessage(""); // Clear previous messages

    try {
      // Send POST request to create a new lost item
      const response = await axios.post("http://localhost:8093/items", newItem);

      if (response.status === 201) {
        setMessage("Lost item created successfully!");
        // Reset form fields after successful submission
        setName("");
        setDescription("");
        setLocation("");
        setDateLost("");
        setStatus("Lost");
      }
    } catch (error) {
      setMessage("Error creating lost item: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Create New Lost Item</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Item Name</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block">Description</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block">Location</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block">Date Lost</label>
          <input
            type="date"
            className="border p-2 w-full rounded"
            value={dateLost}
            onChange={(e) => setDateLost(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block">Status</label>
          <select
            className="border p-2 w-full rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
            <option value="Claimed">Claimed</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default CreateLostItemForm;
