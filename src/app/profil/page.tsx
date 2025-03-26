"use client"
import React from 'react'
import Footer from '../components/Footer'
import { UserAtom } from '../utils/atoms';
import { useAtom } from 'jotai';


export default function Profil() {
  const [user] = useAtom(UserAtom);
  return (
    <div>
      <p>Profile</p>
      <Footer/>
    </div>
  )
}