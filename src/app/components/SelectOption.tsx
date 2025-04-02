"use client";
import React from "react";

interface SelectOptionProps {
  label: string;
  name: string;
  options: { label: string; value: string; disabled?: boolean }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectOption({
  label,
  name,
  options,
  onChange,
}: SelectOptionProps) {
  return (
    <div className="drop-shadow-md block mt-4 m-auto  h-11 rounded-xl bg-white px-3 py-1.5 text-base flex flex-col items-center">
      <select name={name} id={name} className="p-2 rounded" onChange={onChange}>
        <option value="" hidden>
          {label}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
