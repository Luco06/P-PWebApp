"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { FcGoogle } from "react-icons/fc";
import { useMutation } from '@apollo/client';
import { SINGN_USER } from '@/services/singn';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import Input from "../components/Input"
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
          <Input autoComplete="false" required className='w-96' label='Prénom'  value={userInfo.prenom} type='text' onChange={(e)=> setUserInfo({...userInfo, prenom: e.target.value})} id='prenom' name='prenom'/>
          <Input autoComplete="false"  required className='w-96' label='Nom'  value={userInfo.nom} type='text' onChange={(e)=> setUserInfo({...userInfo, nom: e.target.value})} id='nom' name='nom'/>
          <Input autoComplete="false"  required className='w-96' label='E-mail'  value={userInfo.email} type='email' onChange={(e)=> setUserInfo({...userInfo, email: e.target.value})} id='email' name='email'/>
          <Input autoComplete="false"  required className='w-96' label='Mot de passe'  value={userInfo.mdp} type='password' onChange={(e)=> setUserInfo({...userInfo, mdp: e.target.value})} id='mdp' name='mdp'/>

        <Button type='submit' txt="S'inscrire" className='w-32 rounded-md hover:bg-redpapilles hover:text-white'/>
        <Button type='button' txt={<><FcGoogle size={30} /> Se connecter avec Google </>} className='w-96'/>
        </form>
        <Link href="/login" className="text-right mt-4 mb-4 hover:text-redpapilles">
          Déjà un compte ?
        </Link>
      </div>
  );
}
