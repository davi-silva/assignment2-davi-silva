import { useEffect, useState, useRef } from "react";

import { FixedSizeList } from "react-window";
import { Link } from "react-router-dom";
import { useData } from "../state/DataContext";

const LIMIT = 20;
const ITEM_SIZE = 40;
const DEBOUNCE_DELAY = 500;

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
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const controller = new AbortController();
      fetchItems({ signal: controller.signal, q, page, limit: LIMIT }).catch(
        (err) => {
          if (err.name !== "AbortError") {
            console.error(err);
          }
        }
      );
    }, DEBOUNCE_DELAY);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [fetchItems, q, page]);

  return (
    <div>
      <input
        className="search-input"
        type="search"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setPage(1); // Reset page to 1 on search
        }}
        placeholder="Search..."
      />
      {loading || items.length === 0 ? (
        <div className="item-list-container">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="item-list-row skeleton-loader"
              style={{
                height: ITEM_SIZE,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80%",
                  height: "1rem",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "4px",
                }}
              ></div>
            </div>
          ))}
        </div>
      ) : (
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
