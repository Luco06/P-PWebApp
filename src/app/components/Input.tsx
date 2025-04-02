"use client";
import React from "react";

type InputProps = {
  label?: string;
  type: string;
  value?: string;
  name: string;
  id: string;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required: boolean;
};

export default function Input({
  label,
  type,
  value,
  onChange,
  name,
  id,
  className = "",
  required,
  autoComplete,
}: InputProps) {
  return (
    <div className="mt-4 m-auto items-center">
      <label className="block text-sm/6 text-colortxt text-start">
        {label}
      </label>
      <input
        autoComplete={autoComplete}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        required={required}
        className={`drop-shadow-md block h-11 rounded-xl bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-redpapilles sm:text-sm/6 ${className}`}
      />
    </div>
  );
}
