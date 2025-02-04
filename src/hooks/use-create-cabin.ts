import { createEditCabin } from "@/api/cabins";
import { useMutation } from "@tanstack/react-query";

export const useCreateCabin = () => {
  const { mutate: createCabin, isPending: isCreating, isSuccess, isError, error } = useMutation({
    mutationFn: createEditCabin,
  });

  return { createCabin, isCreating, isError, isSuccess, error };
}