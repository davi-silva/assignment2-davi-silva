import React, { useEffect, useState } from "react";

import { FixedSizeList } from "react-window";
import { Link } from "react-router-dom";
import { useData } from "../state/DataContext";

const LIMIT = 20;
const ITEM_SIZE = 35;

const Row = ({ index, style, data }) => {
  const item = data[index];
  return (
    <div className="item-list-row" style={style}>
      <Link to={"/items/" + item.id}>{item.name}</Link>
    </div>
  );
};

function Items() {
  const { items, total, fetchItems, loading } = useData();
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const controller = new AbortController();
    fetchItems({ signal: controller.signal, q, page, limit: LIMIT }).catch(
      (err) => {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    );

    return () => {
      controller.abort();
    };
  }, [fetchItems, q, page]);

  return (
    <div>
      <input
        className="search-input"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search..."
      />
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="item-list-container">
          <FixedSizeList
            height={500}
            itemCount={items.length}
            itemSize={ITEM_SIZE}
            itemData={items}
          >
            {Row}
          </FixedSizeList>
        </div>
      )}
      <div className="pagination-controls">
        <button onClick={() => setPage((p) => p - 1)} disabled={page <= 1}>
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(total / LIMIT)}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= Math.ceil(total / LIMIT)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Items;
