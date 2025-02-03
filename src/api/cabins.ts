import { Cabin } from "@/types";
import { supabase } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error)
  {
    throw new Error(error.message);
  }
  return data;
}

export async function deleteCabin(cabin: Cabin) {
  let { data, error } = await supabase.from("cabins").delete().eq("id", cabin.id);
  if (error)
  {
    throw new Error(error.message);
  }
  return data;
}

export async function createEditCabin(cabin: Cabin) {
  if (cabin.id)
  {
    const { data, error } = await supabase
      .from('cabins')
      .update(cabin)
      .eq('id', cabin.id)
      .select()
    if (error)
    {
      throw new Error(error.message);
    }
    return data;
  }
  const { data, error } = await supabase
    .from('cabins')
    .insert([cabin])
    .select()

  if (error)
  {
    throw new Error(error.message);
  }
  return data;
}

export async function uploadCabbinImage(file: File) {
  const fileExtension = file.name.split('.').pop();
  const newFileName = `${Date.now()}.${fileExtension}`;
  const { data, error } = await supabase.storage.from('cabin-images').upload(newFileName, file);
  if (error)
  {
    throw new Error(error.message);
  }
  return data;
}

export async function removeCabinImage(imageUrl: string) {
  const imageUrlParts = imageUrl.split('/');
  const folderAndFileName = `${imageUrlParts[imageUrlParts.length - 1]}`;
  const { data, error } = await supabase.storage.from('cabin-images').remove([folderAndFileName]);

  if (error)
  {
    throw new Error(error.message);
  }
  return data;
}