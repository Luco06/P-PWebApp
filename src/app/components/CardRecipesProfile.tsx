"use client"
import React from 'react'

type CardProfileRecipeProps = {
  titre: string
  dificulty: string
  temps: string
  bgImage: string
}

export default function CardRecipesprofile({ titre, dificulty, temps, bgImage}:CardProfileRecipeProps) {
  return (
    <div className='flex flex-col items-center justify-between rounded-lg m-5 drop-shadow-md border w-xs h-50 bg-cover bg-center text-white font-extrabold relative'style={{ backgroundImage: `url(${bgImage})` }}>
      {/* Bandeau supérieur */}
      <div className='bg-redpapilles w-full border-8 border-redpapilles rounded-t-lg text-center'>
        <h4 className='drop-shadow-md'>{titre}</h4>
      </div>

      <p>CardRecipesprofile</p>

      {/* Bandeau inférieur fixé en bas */}
      <div className='bg-redpapilles w-full border-8 border-redpapilles rounded-b-lg flex flex-row justify-between items-center absolute bottom-0'>
        <p className="text-white drop-shadow-md">Difficulté: {dificulty} </p>
        <p className="text-white drop-shadow-md">Temps: {temps} </p>
      </div>
    </div>
  )
}
