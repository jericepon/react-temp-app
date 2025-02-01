import { supabase } from "./supabase";
type Cabin = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}
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

export async function createCabin(newCabin: Cabin) {
  const { data, error } = await supabase
    .from('cabins')
    .insert([
      newCabin
    ])
    .select()
  if (error)
  {
    throw new Error(error.message);
  }
  return data;
}