import { useItem } from "../hooks/useItem";

function ItemForm() {
  const { form, mutation } = useItem();

  return (
    <form onSubmit={form.handleSubmit(form.onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" {...form.register("name")} />
        {form.errors.name && <p>{form.errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input id="category" type="text" {...form.register("category")} />
        {form.errors.category && <p>{form.errors.category.message}</p>}
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          {...form.register("price", { valueAsNumber: true })}
        />
        {form.errors.price && <p>{form.errors.price.message}</p>}
      </div>
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Submitting..." : "Submit"}
      </button>
      {mutation.isError && <p>{mutation.error.message}</p>}
    </form>
  );
}

export default ItemForm;
