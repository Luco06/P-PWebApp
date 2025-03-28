"use client"
import React from 'react'
import Button from './Button'
/**Ajouter les Props */
type Props = {}

export default function CatePiles({}: Props) {
  return (
    <>
   <div className='flex flex-row w-2xl justify-between items-center m-auto'>
        <Button type='button' txt='Viande' className='w-50'/>
        <Button type='button' txt='Poisson' className='w-50'/>
        <Button type='button' txt='Végétarien' className='w-50'/>
    </div>
    <div className='flex flex-row w-2xl justify-between items-center m-auto'>
        <Button type='button' txt='Desserts' className='w-50'/>
        <Button type='button' txt='Boissons' className='w-50'/>
        <Button type='button' txt='Sauces' className='w-50'/>
    </div>
    </>
  
  )
}