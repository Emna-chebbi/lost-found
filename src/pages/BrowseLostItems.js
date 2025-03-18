import React, { useState, useEffect } from "react";
import axios from "../services/restService";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { CardContent } from "@mui/material";

function BrowseLostItems() {
  const [lostItems, setLostItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch lost items on initial load
  useEffect(() => {
    fetchLostItems();
  }, []);

  // Fetch all lost items from the REST API
  const fetchLostItems = () => {
    axios.get("http://localhost:8093/items")
      .then(response => {
        setLostItems(response.data);
      })
      .catch(error => console.error("Error fetching items:", error));
  };

  // Handle delete item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8093/items/${id}`);
      setLostItems(lostItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Handle edit item
  const handleEdit = (item) => {
    setEditingItem(item);
  };

  // Handle update item
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
    <div>
      <h2 className="text-xl font-bold mb-4">Browse Lost Items</h2>
      
      {/* Display All Items */}
      <div className="mt-6">
        {lostItems.length === 0 && <p>No lost items found.</p>}
        {lostItems.map(item => (
          <Card key={item.id} className="mb-4 p-4">
            <CardContent>
              {editingItem?.id === item.id ? (
                <div>
                  <input type="text" value={editingItem.name} onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })} />
                  <input type="text" value={editingItem.description} onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })} />
                  <input type="text" value={editingItem.location} onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })} />
                  <input type="date" value={editingItem.dateLost} onChange={(e) => setEditingItem({ ...editingItem, dateLost: e.target.value })} />
                  <Button onClick={handleUpdate} className="mr-2">Save</Button>
                  <Button onClick={() => setEditingItem(null)} className="bg-gray-500">Cancel</Button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p><strong>Date Lost:</strong> {item.dateLost}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                  <Button onClick={() => handleEdit(item)} className="mr-2">Edit</Button>
                  <Button onClick={() => handleDelete(item.id)} className="bg-red-500">Delete</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default BrowseLostItems;
