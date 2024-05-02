"use server";
import * as z from "zod";
import { createClient } from "@/utils/supabase/server";

//Form Schema
const formSchema = z.object({
  nombre: z.string()
    .min(4, { message: "Debe de contener mínimo 4 caracteres" })
    .max(20, { message: "Longitud excedida" }),
  descripcion: z
    .string()
    .min(8, { message: "Debe de contener mínimo 8 caracteres" })
    .max(30, { message: "Longitud excedida" }),
  //dame otra opcion para el scheme del precio
  precio_unitario: z.string()
  .transform(Number),
  //image: z.string().url({ message: "La imagen debe ser una URL" }),
});

export async function createDish(data: z.infer<typeof formSchema>) {
    const supabase = createClient();
    console.log('Datos a insertar:', data);
    const { data: dish, error } = await supabase.from('productos').insert([data]);
    if (error) {
        console.error('Hubo un error al insertar los datos:', error);
        return { error: error.message };
    } else {
        console.log('Datos insertados con éxito:', data);
    }
}