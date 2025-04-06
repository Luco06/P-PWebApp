"use client"
import React from 'react'
import Image from 'next/image'

type CommentProps = {
    contenu: string
    avatar: string
    prenom: string
    date: string
}

export default function Comments({contenu, avatar, date, prenom }: CommentProps) {
  return (
    <div className='flex flex-grid-col-1 w-full justify-center items-center mt-2 mb-2'>
        <div className='flex flex-row items-center justify-between'>
        <div className="w-[60px] h-[60px] rounded-full overflow-hidden border border-redpapilles flex items-center justify-center">
      <Image
        className="object-cover object-center "
        src={avatar}
        alt={avatar}
        width={60}
        height={60}
      />
    </div>
            <p>{prenom}</p>
            <p>{date}</p>
        </div>
        <p>{contenu}</p>
    </div>
  )
}