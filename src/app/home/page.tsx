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
export default function Acceuil() {
  const [user] = useAtom(UserAtom);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);

  const { data } = useQuery(GET_RECIPE);
  useEffect(() => {
    if (data) {
      setRecipes(data?.recettes || []);
    }
  }, [data, setRecipes]);
  console.log(recipes, "recipe Home");

  const handleRecipeClick = (recipe: RecipeType) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };
  return (
    <div>
      <Header
        avatar={user?.avatar || "/bobMartin.svg"}
        pseudo={user?.prenom || ""}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center w-full max-w-5xl m-auto mb-20 my-6">
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
                favoris={selectedRecipe?.favoris ? "Oui" : "Non"}
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
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
