"use client"
import React, {useState} from 'react'
import Image from 'next/image'
import { useAtom } from 'jotai'
import { UserAtom } from '../utils/atoms'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Header = {
    avatar?: string
    pseudo?: String
}

export default function Header({avatar, pseudo}: Header) {
  const router = useRouter()
    const [user, setUser] = useAtom(UserAtom)
    const [isOpen, setIsOpen] = useState(false);
    const isConnected =!!user

    const handleLogOut = ()=>{
      setUser(null)
      router.push('/home')
      localStorage.clear()
    }
  return (
    <div className='bg-redpapilles relative top-0 w-full flex flex-row justify-between p-3 items-center'>
      <Link href="/home">
        <h1 className='text-white w-30'>Pages & Papilles</h1>
      </Link>
        {isConnected ? (
        <div className="relative flex items-center gap-3 flex-grow">
          <h3 className="text-white flex-1 text-center"> Bonjour, {pseudo ?? user?.prenom}</h3>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="focus:outline-none relative"
          >
            <Image
              src={avatar ?? user?.avatar ?? "/bobMartin.svg"}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full object-cover cursor-pointer hover:border border-white"
            />
          </button>
          {isOpen && (
            <div 
              className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10"
              onClick={() => setIsOpen(false)} 
            >
              <Link href="/profil" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Profil</Link>
              <Link href="/setting" className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Paramètres</Link>
              <button onClick={handleLogOut} className="block px-4 py-2 text-gray-700 hover:bg-gray-200">Déconnexion</button>
            </div>
          )}
        </div>
        ):(
          <div className="relative flex items-center gap-3 flex-grow">
       <h3 className="text-white flex-1 text-center">Bonjour</h3>
              <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="focus:outline-none relative"
          >
            <Image
              src={"/bobMartin.svg"}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full object-cover cursor-pointer hover:border border-white"
            />
          </button>
          {isOpen && (
            <div 
              className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/singin" className="block px-4 py-2 text-gray-700 hover:bg-redpapilles hover:text-white">S'inscrire</Link>
              <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-redpapilles hover:text-white">Connexion</Link>
            </div>
          )}
    </div>
        )}
        </div>
  )
}