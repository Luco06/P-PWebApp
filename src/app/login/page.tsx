"use client"
import React, {useState} from 'react'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { UserAtom } from '../utils/atoms';
type FormProps = {}

export default function FormLogIn({}: FormProps) {
  const [email, setEmail] = useState("")
  const [mdp, setMdp] = useState("")
  const setUser = useSetAtom(UserAtom)

  const router = useRouter()
  const [loginUser, {loading, data, error}] = useMutation(LOGIN_USER,{
    onCompleted(data){
      console.log(data, "User")
      setUser(data.loginUser.user)
      localStorage.setItem("authToken", data.loginUser.token)
      router.push("/home")
    }
  })

  const handleLogin = async (e: any)=>{
    e.preventDefault();
    try {
      await loginUser({variables: {email, mdp}});
    } catch (error) {
      console.error("Login error", error)
      
    }
  }
  return (
    <div className='flex flex-col m-4  m-auto w-sm mt-20'>
      <h1>Pages & Papilles</h1>
      <h3 >Connexion</h3>
      <form onSubmit={handleLogin}>
      <button type='button' className='drop-shadow-md flex flex-row justify-center items-center gap-3 cursor-pointer gap- block w-96 m-auto mt-4 rounded-full bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-colortxt shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'> <FcGoogle size={30}/> Se connecter avec Google</button>
        <div className="mt-4 m-auto">
        <label className="block text-sm/6 text-colortxt">E-mail</label>
          <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} name="email" id="email" required className=" drop-shadow-md block w-96 h-11 rounded-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-redpapilles sm:text-sm/6"/>
        </div>
        <div className="mt-4 m-auto">
        <label className="block text-sm/6 text-colortxt">Mot de passe</label>
          <input type="password" value={mdp} onChange={(e)=> setMdp(e.target.value)} name="password" id="password" required className=" drop-shadow-md block w-96 h-11 rounded-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-redpapilles sm:text-sm/6"/>
        </div>
        <p className='text-right mt-4 mb-4'>Mot de passe oublié?</p>
        <button type='submit' className='drop-shadow-lg cursor-pointer block w-32 m-auto mt-4 rounded-md bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-colortxt shadow-xs hover:bg-redpapilles hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Se connecter</button>
        {error && <p>Error: {error.message}</p>}
      </form>

        <Link href="/singin" className='text-right mt-4 mb-4 hover:text-redpapilles'>Pas encore inscrit ?</Link>
    </div>
  )
}