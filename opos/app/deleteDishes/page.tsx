"use client";
import React, { startTransition, useEffect, useState } from 'react'
import {deleteProd, fetchDishes} from './actions'
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { start } from 'repl';
import { set } from 'zod';

//crea un array con platillos
const dishes = [
  {
    id: 1,
    name: 'Pasta',
    description: 'Pasta con salsa de tomate',
    price: 50
  },
  {
    id: 2,
    name: 'Pizza',
    description: 'Pizza de peperoni',
    price: 100
  },
  {
    id: 3,
    name: 'Hamburguesa',
    description: 'Hamburguesa con papas',
    price: 80
  },
  {
    id: 4,
    name: 'Hotdog',
    description: 'Hotdog con papas',
    price: 40
  },
  {
    id: 5,
    name: 'Tacos',
    description: 'Tacos de carne asada',
    price: 30
  }
]

function deleteDishes() {
  const [dishes, setDishes] = useState([] as any[]); // Initialize dishes as an empty array
  
  //funcion para eliminar platillos
  function deleteDish(id) {
      console.log('Eliminando platillo con id:', id)
      startTransition(() => {
        deleteProd(id)
        // Luego, elimina el platillo del estado
        setDishes(dishes.filter(dish => dish.id !== id));
      })
  }

  useEffect(() => {
    console.log('Cargando platillos');
    async function loadDishes() {
      const dishes = await fetchDishes();
      setDishes(dishes);
    }

    loadDishes();
    
  }, []);

  return (
    <menu className="flex justify-center w-screen h-screen overflow-auto p-10 bg-slate-500 text-black">
        <div className="flex justify-center items-center flex-wrap w-screen" >
            {dishes.map((dish) => (
                <Card className='w-1/2 m-1 p-4 items-center flex' key={dish.id}>
                    <CardHeader className="w-2/3"><img src="https://web.didiglobal.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2Fn7hs0hadu6ro%2F1O0Be1dObiQBm17GQJHLj8%2F3fde720730f0b3616ecf5a82b928e7f9%2Fpizza-a-domicilio-cerca-de-mi.jpg&w=3840&q=75" alt="Imagen del platillo" /></CardHeader>
                    <CardContent className="w-2/3">
                        <CardTitle>{dish.nombre}</CardTitle>
                        <CardDescription>{dish.descripcion}</CardDescription>
                        <CardDescription>Precio: {dish.precio_unitario}</CardDescription>
                    </CardContent>
                    <Button className="bg-red-500" onClick={()=>deleteDish(dish.id)}>Eliminar</Button>
                </Card>
            ))}
        </div>

    </menu>
  )
}

export default deleteDishes