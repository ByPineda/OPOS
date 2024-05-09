"use client"
import React, { useEffect } from 'react';
import { crearPerfil, eliminarPerfil, consultarPerfiles} from "@/utils/supabase/admin";
import { redirect } from "next/navigation";

async function probarCreacionYEliminacion() {
  try {
    const perfilesFicticios = [
      {
        userId: "20663898-9da2-457a-973d-f57b13cfccf3",
        rol: 'VENDEDOR',
        nombre: 'Juan',
        apellido_paterno: 'Pérez',
        apellido_materno: 'González',
        activo: true,
        correo: 'juan@example.com'
      },
      {
        userId: "20663898-9da2-457a-973d-f57b13cfccf3",
        rol: 'ADMINISTRADOR',
        nombre: 'Pedro',
        apellido_paterno: 'Avendano',
        apellido_materno: 'Gutierrez',
        activo: true,
        correo: 'pedro@example.com'
      },
      {
        userId: "20663898-9da2-457a-973d-f57b13cfccf3",
        rol: 'DESARROLLADOR',
        nombre: 'Pablo',
        apellido_paterno: 'Márquez',
        apellido_materno: 'Aranda',
        activo: true,
        correo: 'pablo@example.com'
      },
    ];
/*
    for (const perfil of perfilesFicticios) {
      const nuevoPerfil: any = await crearPerfil(perfil); // Puedes usar 'any' si el tipo de 'nuevoPerfil' no está definido
      if (nuevoPerfil && nuevoPerfil.id) { // Comprueba si 'nuevoPerfil' y 'id' existen
        console.log('Perfil creado:', nuevoPerfil);
      }
    }

  
const recupera = await consultarPerfiles();
console.log(recupera); */

const elimina = await eliminarPerfil(BigInt(18));
console.log(elimina)


  } catch (error: any) { // Especifica el tipo de 'error' como 'any'
    console.error('Error al probar creación y eliminación de perfiles:', error.message);
  }
}

export default function Page() {
  useEffect(() => {
    probarCreacionYEliminacion();
  }, []); 

  return (
    <div>page</div>
  );
}
