import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrowseLostItems from "./pages/BrowseLostItems";
import ClaimPage from "./pages/ClaimPage";
import Navbar from "./components/Navbar";
import CreateLostItemPage from "./pages/CreateLostItemPage"; 
import SearchLostItems from "./pages/SearchLostItems";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<BrowseLostItems />} />
        <Route path="/claim" element={<ClaimPage />} />
        <Route path="/create-item" element={<CreateLostItemPage />} />
        <Route path="/browse-items" element={<BrowseLostItems />} />
        <Route path="/search" element={<SearchLostItems />} />
      </Routes>
    </Router>
  );
}

export default App;
