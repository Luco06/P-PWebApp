"use client"
import React, {useState} from 'react'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/services/mutations/auth';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { UserAtom } from '../utils/atoms';
import Input from '../components/Input';
import Button from '../components/Button';
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
        <Button type='button' onClick={()=> console.log("Connexion avec GOOGLE")} className='w-96' txt={<> <FcGoogle size={30}/> Se connecter avec Google</>} />
        <Input className='w-96' required={true} label='Email' type='email' value={email} onChange={(e)=>  setEmail(e.target.value)} name='email' id='email'/>
        <Input className='w-96' required={true} label='Mot de passe' type='password' value={mdp} onChange={(e)=>  setMdp(e.target.value)} name='password' id='paswword'/>
        <p className='text-right mt-4 mb-4'>Mot de passe oublié?</p>
        <Button type='submit' txt='Se connecter' className='w-32 rounded-md hover:bg-redpapilles hover:text-white '  />
        {error && <p>Error: {error.message}</p>}
      </form>

        <Link href="/singin" className='text-right mt-4 mb-4 hover:text-redpapilles'>Pas encore inscrit ?</Link>
    </div>
  )
}