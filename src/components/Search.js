// Search.js
import React, { useState } from "react";

function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSearch callback with the current search query
    onSearch(searchQuery);
  };

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        id="search"
        placeholder="search free stuff"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit">🔍</button>
    </form>
  );
}

export default Search;
