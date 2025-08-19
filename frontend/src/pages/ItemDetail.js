import React from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../state/DataContext';

function ItemDetail() {
  const { id } = useParams();
  const { items } = useData();
  const item = items.find((i) => i.id === parseInt(id));

  if (!item) return <p>Loading...</p>;

  return (
    <div className="item-detail">
      <h2>{item.name}</h2>
      <p>
        <strong>Category:</strong> {item.category}
      </p>
      <p>
        <strong>Price:</strong> ${item.price}
      </p>
    </div>
  );
}

export default ItemDetail;
