"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { FcGoogle } from "react-icons/fc";
import { useMutation } from '@apollo/client';
import { SINGN_USER } from '@/services/singn';
import { useRouter } from 'next/navigation';
export default function SignIn() {
  const [userInfo, setUserInfo] = useState({
    prenom:"",
    nom:"",
    email:"",
    mdp:"",
  })
  const router = useRouter();
  const [createUser, {loading, data, error}] = useMutation(SINGN_USER, {
    onCompleted(data){
      console.log(data,"UserIsncription")
      router.push("/login")
    }
  })

  const handleSingn = async(e: any)=>{
    e.preventDefault();
    try {
      await createUser({variables: {input:userInfo}});
    } catch (error) {
      console.error("Singn error", error)
    }
  }
  return (
  
      <div className='flex flex-col m-4 m-auto w-sm mt-20'>
        <h1>Pages & Papilles</h1>
        <h3>Inscription</h3>
        <form onSubmit={handleSingn}>
        <div className="mt-4 m-auto">
          <label className="block text-sm/6 text-colortxt">Prénom</label>
          <input
          value={userInfo.prenom}
          onChange={(e)=>setUserInfo({...userInfo, prenom: e.target.value})}
            type="text"
            name="prenom"
            id="prenom"
            required
            className="drop-shadow-md block w-96 h-11 rounded-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-redpapilles sm:text-sm/6"
          />
        </div>
        <div className="mt-4 m-auto">
          <label className="block text-sm/6 text-colortxt">Nom</label>
          <input
          value={userInfo.nom}
          onChange={(e)=> setUserInfo({... userInfo, nom:e.target.value})}
            type="text"
            name="Nom"
            id="Nom"
            required
            className="drop-shadow-md block w-96 h-11 rounded-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-redpapilles sm:text-sm/6"
          />
        </div>
        <div className="mt-4 m-auto">
          <label className="block text-sm/6 text-colortxt">E-mail</label>
          <input
               value={userInfo.email}
               onChange={(e)=> setUserInfo({... userInfo, email:e.target.value})}
            type="email"
            name="email"
            id="email"
            required
            className="drop-shadow-md block w-96 h-11 rounded-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-redpapilles sm:text-sm/6"
          />
        </div>
        <div className="mt-4 m-auto">
          <label className="block text-sm/6 text-colortxt">Mot de passe</label>
          <input
               value={userInfo.mdp}
               onChange={(e)=> setUserInfo({... userInfo, mdp:e.target.value})}
            type="password"
            name="mdp"
            id="mdp"
            required
            className="drop-shadow-md block w-96 h-11 rounded-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-redpapilles sm:text-sm/6"
          />
        </div>
        <button
          type="submit"
          className="drop-shadow-lg cursor-pointer block w-32 m-auto mt-4 rounded-md bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-colortxt shadow-xs hover:bg-redpapilles hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          S'inscrire
        </button>
        <button
          type="button"
          className="drop-shadow-md flex flex-row justify-center items-center gap-3 cursor-pointer block w-96 m-auto mt-4 rounded-full bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-colortxt shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <FcGoogle size={30} /> Se connecter avec Google
        </button>
        </form>
        <Link href="/login" className="text-right mt-4 mb-4 hover:text-redpapilles">
          Déjà un compte ?
        </Link>
      </div>
  );
}
