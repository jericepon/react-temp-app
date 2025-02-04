import { supabase } from "./supabase";

export async function getSettings() {
  let { data, error } = await supabase.from("settings").select("*");
  if (error)
  {
    throw new Error(error.message);
  }
  return data;
}

export async function updateSettings(settings: any) {
  const { data, error } = await supabase
    .from('settings')
    .update(settings)
    .eq('id', 1)
    .single()

  if (error)
  {
    throw new Error(error.message);
  }
  return data;
}
