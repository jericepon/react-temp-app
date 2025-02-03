import { createEditCabin } from "@/api/cabins";
import { useMutation } from "@tanstack/react-query";

export const useCreateCabin = () => {
  const { mutate: createCabin, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: createEditCabin,
  });

  return { createCabin, isPending, isError, isSuccess, error };
}