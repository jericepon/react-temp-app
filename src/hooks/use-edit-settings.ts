import { updateSettings } from "@/api/settings";
import { useMutation } from "@tanstack/react-query";

export const useEditSettings = () => {
  const { mutate: editSettings, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: updateSettings,
  });

  return { editSettings, isPending, isError, isSuccess, error };
}