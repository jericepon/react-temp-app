import { supabase } from "./supabase";

export async function getSettings() {
  let { data, error } = await supabase.from("settings").select("*");
  if (error)
  {
    throw new Error(error.message);
  }
  return data;
}
