import React, { useState, useEffect } from "react";
import axios from "../services/restService";
import { Card } from "../components/ui/card";
import { CardContent } from "@mui/material";
import { Link } from "react-router-dom";  
import "./BrowseLostItems.css"; 

function BrowseLostItems() {
  const [lostItems, setLostItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchLostItems();
  }, []);

  const fetchLostItems = () => {
    axios.get("http://localhost:8093/items")
      .then(response => {
        setLostItems(response.data);
      })
      .catch(error => console.error("Error fetching items:", error));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8093/items/${id}`);
      setLostItems(lostItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8093/items/${editingItem.id}`, editingItem);
      setEditingItem(null);
      fetchLostItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="browse-lost-items-container">
      <div className="hero-section">
        <div className="hero-text">
          <h1 className="hero-title">Browse Lost Items 🔍</h1>
          <h2 className="hero-subtitle">Find lost items reported by others and us at stations.</h2>
        </div>
      </div>

      <div className="lost-items-grid">
        {lostItems.length === 0 && <p>No lost items found.</p>}
        {lostItems.map(item => (
          <div key={item.id} className="lost-item-widget">
            <Card className="item-card">
              <CardContent>
                {editingItem?.id === item.id ? (
                  <div className="edit-form">
                    <h3>Edit Lost Item</h3>
                    <input
                      type="text"
                      className="edit-input"
                      placeholder="Item Name"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    />
                    <input
                      type="text"
                      className="edit-input"
                      placeholder="Description"
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    />
                    <input
                      type="text"
                      className="edit-input"
                      placeholder="Location"
                      value={editingItem.location}
                      onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                    />
                    <input
                      type="date"
                      className="edit-input"
                      value={editingItem.dateLost}
                      onChange={(e) => setEditingItem({ ...editingItem, dateLost: e.target.value })}
                    />
                    <div className="edit-actions">
                      <button onClick={handleUpdate} className="save-button">Save</button>
                      <button onClick={() => setEditingItem(null)} className="cancel-button">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="item-name">{item.name}</h3>
                    <p><strong>Date Lost:</strong> {item.dateLost}</p>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Location:</strong> {item.location}</p>
                    <div className="action-buttons">
                      <button onClick={() => handleEdit(item)} className="action-button edit-button">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="action-button delete-button">Delete</button>
                      
                      <Link to={`/claim`} className="action-button browse-claim-button">Claim Item</Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseLostItems;
