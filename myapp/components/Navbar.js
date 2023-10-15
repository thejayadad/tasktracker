'use client'

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'


const Navbar = () => {
    const { data: session } = useSession()

   return(
        <header className="bg-gray-300 px-4 py-12">
        <div className="flex justify-between max-w-screen-xl mx-auto">
          <Link href={'/'}>TaskManager</Link>
          <div className="flex">
            {session ? (
              <>
                <p className='mr-4'> {session.user.email}</p>
                <button onClick={() => signOut()}>Sign out</button>
              </>
            ) : (
              // User is not signed in
              <button onClick={() => signIn()}>Sign in</button>
            )}
          </div>
        </div>
      </header>   
    )
}

export default Navbar