// ListingsContainer.js
import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";

function ListingsContainer({ searchQuery, setSearchQuery }) {
  const [listings, setListings] = useState([]);

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

  return (
    <main>
      {/* Removed the Search component here */}
      <ul className="cards">
        {listings
          .filter((listing) =>
            listing.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
          .map((listing) => (
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
