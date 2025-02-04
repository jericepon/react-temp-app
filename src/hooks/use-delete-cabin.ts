import { deleteCabin as mutationFn } from "@/api/cabins";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCabin = () => {
  const { mutate: deleteCabin, isPending: isDeleting, isSuccess: isSuccessDeleting, isError: isErrorDeleting, error: errorDeleting } = useMutation({
    mutationKey: ["deleteCabin"],
    mutationFn,
  });

  return { deleteCabin, isDeleting, isSuccessDeleting, isErrorDeleting, errorDeleting };
}