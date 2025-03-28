"use client"
import React from 'react'

type Props = {
    recettes: number
    publique: number
    favoris: number
}

export default function InfoRecipes({recettes, publique, favoris}: Props) {
  return (
    <div className= 'flex flex-row justify-between w-100 m-auto mt-5'>
        <p>Recettes: {recettes} </p>
        <p>Publiques: {publique} </p>
        <p>Favoris: {favoris} </p>
    </div>
  )
}