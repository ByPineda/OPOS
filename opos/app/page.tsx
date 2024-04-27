import readUserSession from '@/utils/supabase/actions'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
  const { data }  = await readUserSession()
  if (data.user == null){
    return redirect("/login")
  }
  return (
    <div>Home Page</div>
  )
}
