"use server";
import * as z from "zod";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

//Form Schema
const formSchema = z.object({
  email: z.string().email({ message: "Dirección de correo no válida" }),
  password: z
    .string()
    .min(8, { message: "Debe de contener mínimo 8 caracteres" })
    .max(100, { message: "Longitud excedida" }),
});


export async function login(data: z.infer<typeof formSchema>) {
  console.log(data);
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    if (error.message === "Invalid login credentials") {
      return { error: "Credenciales incorrectas" };
    }
    return { error: "Ha ocurrido un error" };
  }
  revalidatePath("/");
  return redirect("/");

}
