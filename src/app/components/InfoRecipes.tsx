"use client"
import React from 'react'

type Props = {
    recettes: number
    publique: number
    favoris: number
}

export default function InfoRecipes({recettes, publique, favoris}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center w-full max-w-md mx-auto mt-5 m-auto">
        <p>Recettes: {recettes} </p>
        <p>Publiques: {publique} </p>
        <p>Favoris: {favoris} </p>
    </div>
  )
}