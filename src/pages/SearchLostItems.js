import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_BY_NAME, SEARCH_BY_DATE, SEARCH_BY_LOCATION, SEARCH_BY_DESCRIPTION } from "../services/graphqlService";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { CardContent } from "@mui/material";

function SearchLostItems() {
  const [filters, setFilters] = useState({
    name: "",
    dateLost: "",
    location: "",
    description: "",
  });

  const [searchResults, setSearchResults] = useState([]); // Store combined results

  // Declare lazy queries
  const [searchByName] = useLazyQuery(SEARCH_BY_NAME, {
    onCompleted: (data) => {
      if (data.searchByName) updateResults(data.searchByName);
    },
  });

  const [searchByDate] = useLazyQuery(SEARCH_BY_DATE, {
    onCompleted: (data) => {
      if (data.searchByDate) updateResults(data.searchByDate);
    },
  });

  const [searchByLocation] = useLazyQuery(SEARCH_BY_LOCATION, {
    onCompleted: (data) => {
      if (data.searchByLocation) updateResults(data.searchByLocation);
    },
  });

  const [searchByDescription] = useLazyQuery(SEARCH_BY_DESCRIPTION, {
    onCompleted: (data) => {
      if (data.searchByDescription) updateResults(data.searchByDescription);
    },
  });

  // Update search results while preventing duplicates
  const updateResults = (newData) => {
    setSearchResults((prevResults) => {
      const combined = [...prevResults, ...newData];
      return Array.from(new Map(combined.map((item) => [item.id, item])).values());
    });
  };

  // Handle search based on filters
  const handleSearch = () => {
    setSearchResults([]); // Clear old results

    if (filters.name) searchByName({ variables: { name: filters.name } });
    if (filters.dateLost) searchByDate({ variables: { dateLost: filters.dateLost } });
    if (filters.location) searchByLocation({ variables: { location: filters.location } });
    if (filters.description) searchByDescription({ variables: { description: filters.description } });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Search Lost Items</h2>

      {/* Search input fields */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Input
          type="text"
          placeholder="Item Name"
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />
        <Input
          type="date"
          onChange={(e) => setFilters({ ...filters, dateLost: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Location"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Description"
          onChange={(e) => setFilters({ ...filters, description: e.target.value })}
        />
      </div>

      {/* Search Button */}
      <Button onClick={handleSearch}>Search</Button>

      {/* Results */}
      <div className="mt-6">
        {searchResults.length === 0 ? <p>No results found.</p> : null}

        {searchResults.map((item) => (
          <Card key={item.id}>
            <CardContent>
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Date Lost:</strong> {item.dateLost}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default SearchLostItems;
