"use client"
import React from 'react'
import Image from 'next/image'

type CardRecipeProps = {
    auteur: string
    dificulty: string
    titre: string
    bgImage: string
    couvert: string
    cuission: string
    tep_prep: string
    categorie: string
    favoris: string
    ingredients: string[]
    instructions: string[] 
}

export default function CardRecipe({titre, dificulty, bgImage,auteur, cuission, couvert, tep_prep, categorie, favoris, ingredients, instructions}: CardRecipeProps) {
  return (
    <div className='flex flex-col items-center justify-between rounded-lg m-5 p-1 drop-shadow-md border w-fulltext-white font-extrabold relative bg-scroll'>
      {/* Bandeau supérieur */}
      <div className='bg-redpapilles w-full border-8 border-redpapilles rounded-t-lg text-center text-white drop-shadow-md'>
        <h4 className='drop-shadow-md'>{titre}</h4>
        <h5 className='drop-shadow-md'> Par: {auteur}</h5>
      </div>
      <div className="flex-grow relative w-full h-[300px]">
        <Image src={bgImage} alt={titre} fill className="object-cover"/>
      </div>
      {/* Bandeau inférieur fixé en bas */}
      <div className='bg-redpapilles w-full border-8 border-redpapilles rounded-b-lg grid grid-cols-3 justify-center items-center '>
      <p className="text-white drop-shadow-md">Couvert: {couvert} </p>
      <p className="text-white drop-shadow-md">Cuisson: {cuission} </p>
      <p className="text-white drop-shadow-md">Préparation: {tep_prep} </p>
        <p className="text-white drop-shadow-md">Difficulté: {dificulty} </p>
        <p className="text-white drop-shadow-md">Categorie: {categorie} </p>
        <p className="text-white drop-shadow-md">Favoris: {favoris} </p>

      </div>
      <div className='flex flex-col items-center, justify-between '>
        <h5 className='text-center'>Ingrédients</h5>
        <ul className='grid grid-cols-2 justify-center m-5 text-start'>
                {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
                    ))}
         </ul>
      </div>
      <div className='flex flex-col items-center, justify-between'>
        <h5 className='text-center'>Instructions</h5>
        <ol className='text-start'>
                {instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li> // Utilisez index comme clé
                    ))}
                </ol>
      </div>
    </div>
  )
}