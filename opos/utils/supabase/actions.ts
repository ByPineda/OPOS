"use server"

import { createClient } from "./server"

export default async function readUserSession() {
    const supabase = await createClient()
    return supabase.auth.getUser()
}
