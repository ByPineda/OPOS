"use client";
import React from "react";

// COMPONENTS-------------------------------------------------------------------------------------
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

//-----------------------------------------------------------------------------------------------------------------

//FORMS-----------------------------------------------------------------------------------------------------------
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useTransition } from "react";

//-----------------------------------------------------------------------------------------------------------------

//Function to login
import { login } from "./actions";
import { redirect } from "next/navigation";



//Form Schema
const formSchema = z.object({
  email: z.string().email({ message: "Dirección de correo no válida" }),
  password: z
    .string()
    .min(8, { message: "Debe de contener mínimo 8 caracteres" })
    .max(100, { message: "Longitud excedida" }),
});

export default function loginPage() {

  //Verificamos si hay una sesión activa
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<undefined | string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setError("");
    startTransition(async () => {
      const result = await login(data);
      console.log(result);
      if (result.error) {
        setError(result.error);
      }
    });
  }

  return (
    <main className="flex justify-center items-center w-screen h-screen bg-slate-500 text-black">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Inicio de sesión</CardTitle>
          <CardDescription>
            Ingresa el correo que se te proporcionó para la plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico:</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mt-4">Contraseña:</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4 w-full">
                Iniciar sesión
              </Button>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
