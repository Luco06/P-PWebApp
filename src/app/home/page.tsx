"use client"
import React from 'react';
import Header from '../components/Header';
import { UserAtom } from '../utils/atoms';
import { useAtom } from 'jotai';
import Footer from '../components/Footer';
export default function Acceuil() {
  const [user] = useAtom(UserAtom);
  return (
    <div>
      <Header avatar={user?.avatar || '/bobMartin.svg'} pseudo={user?.prenom || ""} />
      <Footer/>
    </div>
  );
}
