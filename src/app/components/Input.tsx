"usee client"
import React from 'react'

type InputProps = {
    label: string
    type: string
    value: string
    name: string
    id: string
    onChange: (e:React.ChangeEvent<HTMLInputElement>)=> void
    className?: string;
    required: boolean
}

export default function Input({label, type, value, onChange, name, id, className="", required}: InputProps) {
  return (
    <div className="mt-4 m-auto">
    <label className="block text-sm/6 text-colortxt">{label}</label>
      <input type={type} value={value} onChange={onChange} name={name} id={id} required={required}  className={`drop-shadow-md block h-11 rounded-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-redpapilles sm:text-sm/6 ${className}`}/>
    </div>
  )
}