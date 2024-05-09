"use server"
import { createClient } from "./server";

// Conexión con Supabase
const supabase = createClient();

// Crear un nuevo perfil
async function crearPerfil(perfil: any) {
  const { data, error } = await supabase
    .from('perfiles')
    .insert(perfil);
  if (error) {
    console.error('Error al crear el perfil:', error.message);
    return null;
  }
  return data;
}

// Consultar todos los perfiles
async function consultarPerfiles() {
  const { data, error } = await supabase
    .from('perfiles')
    .select('*');
  if (error) {
    console.error('Error al consultar los perfiles:', error.message);
    return null;
  }
  return data;
}

// Buscar perfiles por nombre
async function buscarPerfiles(nombre: string) {
  const { data, error } = await supabase
    .from('perfiles')
    .select('*')
    .filter('nombre', 'ilike', `%${nombre}%`);
  if (error) {
    console.error('Error al buscar perfiles por nombre:', error.message);
    return null;
  }
  return data;
}

// Eliminar un perfil por ID
async function eliminarPerfil(id: bigint) {
  const { error } = await supabase
    .from('perfiles')
    .delete()
    .eq('id', id);
  if (error) {
    console.error('Error al eliminar el perfil:', error.message);
    return false;
  }
  return true;
}

export { crearPerfil, consultarPerfiles, buscarPerfiles, eliminarPerfil };

