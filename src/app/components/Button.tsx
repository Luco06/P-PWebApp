"use client"

import React, {ReactNode} from 'react'

type ButtonProps = {
    txt: string | ReactNode;
    className?: string;
    type?: "submit" | "reset" | "button";
    onClick?: ()=>void;
}

export default function Button({type, txt, className="", onClick}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`drop-shadow-md flex flex-row justify-center items-center gap-3 cursor-pointer gap- block  m-auto mt-4 rounded-full bg-white px-3.5 py-2.5 text-center text-sm font-semibold text-colortxt shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}>{txt}</button>
  )
}