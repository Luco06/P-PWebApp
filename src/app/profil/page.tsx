"use client"
import React, { useState, useEffect } from 'react';
import Avatar from '../components/Avatar';
import Footer from '../components/Footer';
import InfoRecipes from '../components/InfoRecipes';
import CatePiles from '../components/CatePiles';
import CardRecipesprofile from '../components/CardRecipesProfile';
import { UserAtom } from '../utils/atoms';
import { useAtomValue } from 'jotai';

const defaultRecipe = {
  titre: "Spaghetti Bolo",
  dificulty: "Facile",
  tps_prep: "10 min",
  img: "/spaghetti_bolo.png" // URL de l'image par défaut
};

export default function Profil() {
  const userInfo = useAtomValue(UserAtom);
  
  // ✅ Utilisation d'un state local pour stocker les recettes affichées
  const [recipes, setRecipes] = useState(userInfo?.recettes || []);

  useEffect(() => {
    if (Array.isArray(userInfo?.recettes)) {
      setRecipes(userInfo.recettes);
    }
  }, [userInfo]);

  // Vérifier si des recettes existent, sinon utiliser la recette par défaut
  const recipeToDisplay = recipes.length > 0 ? recipes[0] : defaultRecipe;

  return (
    <div className="flex flex-col items-center justify-center m-auto w-full mt-10">
      <Avatar
        src={userInfo?.avatar || "/bobMartin.svg"}
        alt={userInfo?.prenom || "bob"}
        width={110}
        height={110}
      />
      <p className="text-redpapilles">{userInfo?.prenom} {userInfo?.nom}</p>

      <InfoRecipes
        recettes={recipes.length}
        publique={recipes.length}
        favoris={recipes.length}
      />

      <CatePiles />

      <CardRecipesprofile
        titre={recipeToDisplay.titre}
        dificulty={recipeToDisplay.dificulty}
        temps={recipeToDisplay.tps_prep}
        bgImage={recipeToDisplay.img}
      />

      <p>Profile</p>
      <Footer />
    </div>
  );
}
