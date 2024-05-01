"use client";
import React from 'react'

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTransition } from "react";

import { createDish } from "./actions";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

//Form Schema
const formSchema = z.object({
  nameDish: z.string()
    .min(4, { message: "Debe de contener mínimo 4 caracteres" })
    .max(20, { message: "Longitud excedida" }),
  descriptionDish: z
    .string()
    .min(8, { message: "Debe de contener mínimo 8 caracteres" })
    .max(30, { message: "Longitud excedida" }),
  //dame otra opcion para el scheme del precio
  precio: z.string()
  .transform(Number),
  image: z.string().url({ message: "La imagen debe ser una URL" }),
});

function AddDishes() {
  const [error, setError] = useState<undefined | string>("");
  const { register, handleSubmit } = useForm();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameDish: "",
      descriptionDish: "",
      precio: '',
      image: "",
    },
  });

  //Se crea el submit para mandar los datos del formulario a la base de datos de supabase
  function onSubmit (data: z.infer<typeof formSchema>) {
    setError("");
    startTransition(() => {
      createDish(data);
    });
    
  };

  return (
    // se agrega el componente Card con inputs para agregar platillos
    <main className="flex justify-center items-center w-screen h-screen bg-slate-500 text-black">
      <Card className='mx-auto max-w-sm'>
        <CardHeader>
          <CardTitle>Agregar Platillos</CardTitle>
          <CardDescription>Completa los campos para agregar un platillo</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="nameDish"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del platillo:</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descriptionDish"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción del platillo:</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="precio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio:</FormLabel>
                    <FormControl>
                      <Input placeholder="$..." {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de la imagen:</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} type="file" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-4 w-full">
                Guardar platillo
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


  )
}

export default AddDishes