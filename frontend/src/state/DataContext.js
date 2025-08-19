import React, { createContext, useCallback, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(async ({ signal, q, page, limit }) => {
    setLoading(true);
    const params = new URLSearchParams({ q, page, limit });
    try {
      const res = await fetch(`http://localhost:4001/api/items?${params}`, {
        signal,
      });
      const json = await res.json();
      const totalCount = res.headers.get("X-Total-Count");
      setItems(json);
      setTotal(parseInt(totalCount, 10) || 0);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DataContext.Provider value={{ items, total, fetchItems, loading }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
