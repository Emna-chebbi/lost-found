import React from "react";

const LostItemList = ({ items }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-semibold">Lost Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="border-b p-2">
            <strong>{item.name}</strong> - {item.location} ({item.date_lost})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LostItemList;