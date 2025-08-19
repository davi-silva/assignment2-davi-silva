import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useItem } from '../hooks/useItem';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().positive('Price must be a positive number'),
});

function ItemForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useItem();

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input id="category" {...register('category')} />
        {errors.category && <p>{errors.category.message}</p>}
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input id="price" type="number" {...register('price', { valueAsNumber: true })} />
        {errors.price && <p>{errors.price.message}</p>}
      </div>
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Submitting...' : 'Submit'}
      </button>
      {mutation.isError && <p>{mutation.error.message}</p>}
    </form>
  );
}

export default ItemForm;
