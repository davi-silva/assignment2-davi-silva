import { Link, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { DataProvider } from "../state/DataContext";
import ItemDetail from "./ItemDetail";
import ItemForm from "./ItemForm";
import Items from "./Items";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <nav style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
          <Link to="/">Items</Link> | <Link to="/new">New Item</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Items />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/new" element={<ItemForm />} />
        </Routes>
      </DataProvider>
    </QueryClientProvider>
  );
}

export default App;
