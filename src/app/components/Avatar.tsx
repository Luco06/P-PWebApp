"use client"
import React from 'react'
import Image from 'next/image'

type AvatarProps = {
    src:string;
    alt:string;
    width: number;
    height: number;
}

export default function Avatar({src, alt, width, height}: AvatarProps) {
  return (
    <Image className="rounded-full object-cover border border-redpapilles" src={src} alt={alt} width={width} height={height}/>
  )
}