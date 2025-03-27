"use client"
import React, {useState, useEffect} from 'react'
import Avatar from '../components/Avatar'
import Footer from '../components/Footer'
import Button from '../components/Button'
import Input from '../components/Input'
import { UserAtom } from '../utils/atoms'
import { useAtomValue } from 'jotai'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '@/services/updateUser'


type Props = {}

export default function Setting({}: Props) {
  const token = localStorage.getItem("authToken")
  const userInfo = useAtomValue(UserAtom)
  const [userUpdate, setUserUpdate] = useState({
 mdp:"",
 pseudo:""
  })
  useEffect(() => {
    if(! userInfo){
      console.warn("Les informations de l'utilisateur ne pas chargé")
    }
  }, [userInfo])
  
const [updateUser, {loading, data, error}] = useMutation(UPDATE_USER, {
  context: {
    headers : {
      Authorization : `Bearer ${token}`
    }
  },
  onCompleted(data){
    alert("Profile mise à jour !")
  }
})
  const handleUpdate = async(e: any)=>{
    e.preventDefault()
    if(!userInfo){
      alert("Impossible de mettre à jour :  les informations utilisateur sont manquante")
      return;
    }
    try {
      await updateUser({
        variables: {
          updateUserId: userInfo.id,
          input :userUpdate
        }
      })
    } catch (error) {
      console.error("Erreur lors de la mise  à jour ! :", error)
    }
  }
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
      <form onSubmit={handleUpdate}>
      <div className='flex flex-col m-4  m-auto w-sm mt-5'>
      <Input className='w-96' label='Pseudo' type='text' value={userUpdate.pseudo} onChange={(e)=> setUserUpdate({...userUpdate, pseudo: e.target.value})} name='pseudo' id='pseudo' required={false}/>
      <Input className='w-96' label='Mot de passe' type='password' value={userUpdate.mdp} onChange={(e)=> setUserUpdate({...userUpdate, mdp: e.target.value})} name='mdp' id='mdp' required={false}/>
      <Button type='submit' txt='Mettre à jours'onClick={()=>console.log("MAJ")} className='text-redpapilles w-60'/>
      </div>
      </form>

    </div>
      <Footer/>
    </>
 
  )
}