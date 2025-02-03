import { getSettings } from "@/api/settings";
import { useQuery } from "@tanstack/react-query";

export function useSettings() {
  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });
  return { settings, isLoading, error };
}