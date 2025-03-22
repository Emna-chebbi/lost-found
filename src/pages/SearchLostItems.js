import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_BY_NAME, SEARCH_BY_DATE, SEARCH_BY_LOCATION, SEARCH_BY_DESCRIPTION } from "../services/graphqlService";
import { Link } from "react-router-dom"; 
import "./SearchLostItems.css"; 

function SearchLostItems() {
  const [filters, setFilters] = useState({
    name: "",
    dateLost: "",
    location: "",
    description: "",
  });

  const [searchResults, setSearchResults] = useState([]);

  const [searchByName] = useLazyQuery(SEARCH_BY_NAME, {
    onCompleted: (data) => data.searchByName && updateResults(data.searchByName),
  });

  const [searchByDate] = useLazyQuery(SEARCH_BY_DATE, {
    onCompleted: (data) => data.searchByDate && updateResults(data.searchByDate),
  });

  const [searchByLocation] = useLazyQuery(SEARCH_BY_LOCATION, {
    onCompleted: (data) => data.searchByLocation && updateResults(data.searchByLocation),
  });

  const [searchByDescription] = useLazyQuery(SEARCH_BY_DESCRIPTION, {
    onCompleted: (data) => data.searchByDescription && updateResults(data.searchByDescription),
  });

  const updateResults = (newData) => {
    setSearchResults((prevResults) => {
      const combined = [...prevResults, ...newData];
      return Array.from(new Map(combined.map((item) => [item.id, item])).values());
    });
  };

  const handleSearch = () => {
    setSearchResults([]);
    if (filters.name) searchByName({ variables: { name: filters.name } });
    if (filters.dateLost) searchByDate({ variables: { dateLost: filters.dateLost } });
    if (filters.location) searchByLocation({ variables: { location: filters.location } });
    if (filters.description) searchByDescription({ variables: { description: filters.description } });
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Search For Your Lost Items</h2>
      <p className="search-description">
        Enter details about your lost item to quickly find a match in our inventory.
      </p>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Item Name"
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <input
          type="date"
          className="search-input"
          onChange={(e) => setFilters({ ...filters, dateLost: e.target.value })}
        />
        <input
          type="text"
          className="search-input"
          placeholder="Location"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <input
          type="text"
          className="search-input"
          placeholder="Description"
          onChange={(e) => setFilters({ ...filters, description: e.target.value })}
        />
        <button type="button" className="search-button" onClick={handleSearch}>Search</button>
      </div>

      
      <div className="search-results-grid">
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <div key={item.id} className="result-card">
              <h3>{item.name}</h3>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Date Lost:</strong> {item.dateLost}</p>
              <Link to={`/claim`} className="claim-button">Claim</Link>
            </div>
          ))
        ) : (
          <p className="no-results"></p>
        )}
      </div>
    </div>
  );
}

export default SearchLostItems;
