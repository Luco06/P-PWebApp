"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { UserAtom } from "../utils/atoms";
import { useAtom } from "jotai";
import Footer from "../components/Footer";
import { RecipeType } from "../utils/atoms";
import { useQuery } from "@apollo/client";
import { GET_RECIPE } from "@/services/query/recipe";
import CardRecipesprofile from "../components/CardRecipesProfile";
import CardRecipe from "../components/CardRecipe";
import Button from "../components/Button";
import Comments from "../components/Comments";
import { formatDistanceToNow } from 'date-fns';
import {fr} from 'date-fns/locale'

export default function Acceuil() {

  const formatDate = (timestamp: string): string => {
    const dateInMillis = parseInt(timestamp, 10); // Convertir en nombre
    if (isNaN(dateInMillis)) {
      return "Date invalide"; // Gérer le cas où la conversion échoue
    }
    
    const date = new Date(dateInMillis); // Créer un objet Date à partir du timestamp
    return formatDistanceToNow(date, { addSuffix: true,locale:fr });
  };
  
  
  const [user] = useAtom(UserAtom);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

  const { data } = useQuery(GET_RECIPE);
  useEffect(() => {
    if (data?.recettes) {
      const publicRecipes = data.recettes.filter(
        (recipe: RecipeType) => recipe.est_public === true
      );
      setRecipes(publicRecipes);
    }
  }, [data, setRecipes]);

  const handleRecipeClick = (recipe: RecipeType) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };
  console.log(recipes);
  return (
    <div>
      <Header
        avatar={user?.avatar || "/bobMartin.svg"}
        pseudo={user?.prenom || ""}
      />
      <div className="grid auto-cols-max  sm:grid-cols-2 gap-4 place-items-center w-full max-w-5xl m-auto mb-20 my-6 place-content-center justify-items-center">
        {recipes?.map((recipes) => (
          <CardRecipesprofile
            key={recipes.id}
            titre={recipes.titre}
            temps={recipes.tps_cook}
            bgImage={recipes.img}
            dificulty={recipes.dificulty}
            onClick={() => handleRecipeClick(recipes)}
          />
        ))}
        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-white p-4 rounded max-w-lg shadow-lg max-h-[80vh] overflow-y-auto">
              <CardRecipe
                titre={selectedRecipe?.titre || ""}
                dificulty={selectedRecipe?.dificulty || ""}
                bgImage={selectedRecipe?.img || ""}
                auteur={selectedRecipe?.auteur.prenom || ""}
                cuission={selectedRecipe?.tps_cook || ""}
                couvert={selectedRecipe?.nb_person || ""}
                tep_prep={selectedRecipe?.tps_prep || ""}
                categorie={selectedRecipe?.categorie || ""}
                ingredients={selectedRecipe?.ingredients || []}
                instructions={
                  Array.isArray(selectedRecipe?.instructions)
                    ? selectedRecipe.instructions
                    : []
                }
              />
              <div className="flex flex-row items-center, justify-between ">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className="text-redpapilles w-50 border boder-redpapilles"
                  txt="Fermer"
                />
              </div>
              <h4 className="text-center">Commentaire</h4>
              {selectedRecipe?.commentaire.map((comment) => (
                <Comments
                  key={comment?.id}
                  avatar={comment?.auteur.avatar}
                  prenom={comment?.auteur.prenom}
                  contenu={comment?.contenu}
                  date={formatDate(comment?.dateCreation)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
