"use client";
import React from "react";
import Image from "next/image";

type AvatarProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export default function Avatar({ src, alt, width, height }: AvatarProps) {
  return (
    <div className="w-[150px] h-[150px] rounded-full overflow-hidden border border-redpapilles flex items-center justify-center">
      <Image
        className="object-cover object-center "
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
}
