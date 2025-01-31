import { supabase } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error)
  {
    throw new Error(error.message);
  }
  return data;
}

export async function deleteCabin(id: number) {
  let { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error)
  {
    throw new Error(error.message);
  }
  return data;
}