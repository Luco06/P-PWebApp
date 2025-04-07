"use client";
import React from "react";
import Image from "next/image";

type CommentProps = {
  contenu: string;
  avatar: string;
  prenom: string;
  date: string;
};

export default function Comments({
  contenu,
  avatar,
  date,
  prenom,
}: CommentProps) {
  return (
    <div className="flex flex-col w-70 drop-shadow-md  rounded-md justify-between items-center m-3 mt-2 mb-2 p-2">
      <div className="flex flex-row items-center justify-start  w-full ">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-redpapilles flex items-center justify-center mr-5">
          <Image
            className="object-cover object-center "
            src={avatar}
            alt={avatar}
            width={40}
            height={40}
          />
        </div>
        <p>{prenom}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>{contenu}</p>
        <p>Il y a {date}</p>
      </div>
    </div>
  );
}
