"use server";
import * as z from "zod";
import { createClient } from "@/utils/supabase/server";

const formSchema = z.object({
    nameDish: z.string()
      .min(4, { message: "Debe de contener mínimo 4 caracteres" })
      .max(20, { message: "Longitud excedida" }),
    descriptionDish: z
      .string()
      .min(8, { message: "Debe de contener mínimo 8 caracteres" })
      .max(30, { message: "Longitud excedida" }),
    precio: z.number().positive({ message: "El precio debe ser un número positivo" }),
    image: z.string().url({ message: "La imagen debe ser una URL" }),
  });

export async function deleteProd(idDish) {
  const supabase = createClient();
  
  const { data, error } = await supabase
      .from('productos')
      .delete()
      .match({ id: idDish });
  if (error) {
      console.error('Hubo un error al eliminar el platillo:', error);
      return { error: error.message };
  } else {
      console.log('Platillo eliminado con éxito:');
  }
}

export async function fetchDishes() {
  const supabase = createClient();
  const { data, error } = await supabase.from('productos').select('*');
  if (error) {
    console.error('Error fetching dishes:', error);
  } else {
    console.log('Platillos cargados');
    // Do something with the fetched data
  }
  return data;
}