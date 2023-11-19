// ListingsContainer.js
import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";

function ListingsContainer() {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then((response) => response.json())
      .then((data) => setListings(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDeleteListing = (id) => {
    fetch(`http://localhost:6001/listings/${id}`, {
      method: "DELETE",
    })
      .then(() => setListings(listings.filter((listing) => listing.id !== id)))
      .catch((error) => console.error("Error deleting listing:", error));
  };

  const filteredListings = listings.filter((listing) =>
    listing.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <form className="searchbar">
        <input
          type="text"
          id="search"
          placeholder="search free stuff"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <ul className="cards">
        {filteredListings.map((listing) => (
          <ListingCard
            key={listing.id}
            {...listing}
            onDelete={handleDeleteListing}
          />
        ))}
      </ul>
    </main>
  );
}

export default ListingsContainer;
