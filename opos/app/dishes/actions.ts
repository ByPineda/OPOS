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

export async function createDish(data: z.infer<typeof formSchema>) {
    const supabase = createClient();
    
    const { data: dish, error } = await supabase.from('dishes').insert([data]);
    if (error) {
        console.error('Hubo un error al insertar los datos:', error);
        return { error: error.message };
    } else {
        console.log('Datos insertados con éxito:', data);
    }
}