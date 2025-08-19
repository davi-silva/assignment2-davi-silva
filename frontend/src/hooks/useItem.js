import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const postItem = async (data) => {
  const res = await fetch('http://localhost:4001/api/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to create item');
  }
  return res.json();
};

export const useItem = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({ 
    mutationFn: postItem, 
    onSuccess: () => {
      queryClient.invalidateQueries(['items']);
      navigate('/items');
    }
  });

  return mutation;
};