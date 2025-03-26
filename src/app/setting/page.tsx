"use client"
import React from 'react'
import Avatar from '../components/Avatar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Input from '../components/Input'
import { UserAtom } from '../utils/atoms'
import { useAtomValue } from 'jotai'


type Props = {}

export default function Setting({}: Props) {
  const userInfo = useAtomValue(UserAtom)
  return (
    <>
    <div className='flex flex-col items-center jutify-center  m-auto w-lg mt-10'>
      <Avatar src={"/bobMartin.svg"} width={100} height={100} alt='Bob'/>
      <Button type='button' txt='Ajouter une image' onClick={()=>console.log("Ajout d'image")} className='text-redpapilles'/>
      <div className='flex flex-col items-start text-left m-auto w-sm mt-10' >
      <p className='text-redpapilles'>Prénom: {userInfo?.prenom}</p>
      <p className='text-redpapilles'>Nom: {userInfo?.nom}</p>
      <p className='text-redpapilles'>E-mail: {userInfo?.email}</p>
      </div>
      <div className='flex flex-col m-4  m-auto w-sm mt-5'>
      <Input className='w-96' label='Pseudo' type='text' value='Pseudo' onChange={()=>console.log()} name='pseudo' id='pseudo' required={false}/>
      <Input className='w-96' label='Mot de passe' type='password' value='Mot de passe' onChange={()=>console.log()} name='mdp' id='mdp' required={false}/>
      <Button type='button' txt='Mettre à jours'onClick={()=>console.log("MAJ")} className='text-redpapilles w-60'/>
      </div>
    </div>
      <Footer/>
    </>
 
  )
}