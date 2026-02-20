import React, { useState } from "react";

function Filter({ filterBooks, fetchBooks }) {
  const [genre, setGenre] = useState("");

  return (
    <div className="filter">
      <input
        placeholder="Filter by Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <button onClick={() => filterBooks(genre)}>Filter</button>
      <button onClick={fetchBooks}>Reset</button>
    </div>
  );
}

export default Filter;