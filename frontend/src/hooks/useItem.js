import { useMutation, useQueryClient } from "@tanstack/react-query";

import { newItemResolver } from "./zod";
import { postItem } from "../services/item";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useItem = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: newItemResolver,
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: postItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
      navigate("/");
    },
  });

  return {
    mutation,
    form: {
      register,
      handleSubmit,
      errors,
      onSubmit,
    },
  };
};
