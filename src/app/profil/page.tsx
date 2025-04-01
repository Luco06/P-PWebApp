"use client";
import React, { useState, useEffect } from "react";
import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import InfoRecipes from "../components/InfoRecipes";
import CatePiles from "../components/CatePiles";
import CardRecipesprofile from "../components/CardRecipesProfile";
import CardRecipe from "../components/CardRecipe";
import { UserAtom } from "../utils/atoms";
import { useAtomValue } from "jotai";
import { useAtom } from "jotai";
import { RecipeType } from "../utils/atoms";
import Button from "../components/Button";
import UpdateRecipe from "../components/UpdateRecipe";
import Header from "../components/Header";
import { FaPlus } from "react-icons/fa6";
import AddRecipe from "../components/AddRecipe";
import { GET_USER } from "@/services/query/user";
import { useQuery } from "@apollo/client";

export default function Profil() {
  const [userInfo, setUserInfo] = useAtom(UserAtom);

  // ✅ Utilisation d'un state local pour stocker les recettes affichées
  const [recipes, setRecipes] = useState<RecipeType[]>(
    userInfo?.recettes || []
  );
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const {data} = useQuery(GET_USER)

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }

    if (Array.isArray(userInfo?.recettes)) {
      setRecipes(userInfo.recettes);
    }
  }, [data ,userInfo, recipes]);

  const handleRecipeClick = (recipe: RecipeType) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleAddRecipe = () => {
    setIsAddModal(!isAddModal);
  };

  console.log(recipes);
  console.log(selectedRecipe);
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center m-auto w-full mt-10">
        <div className="grid grid-cols-[1fr_auto_1fr]  w-full p-10">
          <FaPlus
            size={50}
            className="fill-redpapilles justify-self-start cursor-pointer"
            onClick={() => handleAddRecipe()}
          />
          <Avatar
            src={userInfo?.avatar || "/bobMartin.svg"}
            alt={userInfo?.prenom || "bob"}
            width={110}
            height={110}
          />
        </div>
        <p className="text-redpapilles">
          {userInfo?.prenom} {userInfo?.nom}
        </p>
        <InfoRecipes
          recettes={recipes.length}
          publique={recipes.length}
          favoris={recipes.length}
        />
        <CatePiles />
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
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-white p-4 rounded max-w-lg shadow-lg max-h-[80vh] overflow-y-auto">
              {isUpdate ? (
                <>
                  <UpdateRecipe setIsModalOpen={setIsModalOpen} recipe={selectedRecipe} />
                </>
              ) : (
                <>
                  {" "}
                  <CardRecipe
                    titre={selectedRecipe?.titre || ""}
                    dificulty={selectedRecipe?.dificulty || ""}
                    bgImage={selectedRecipe?.img || ""}
                    auteur={userInfo?.prenom || ""}
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
                      onClick={() => setIsUpdate(true)}
                      className="text-redpapilles w-50 border boder-redpapilles"
                      txt="Modifié"
                    />
                    <Button
                      onClick={() => setIsModalOpen(false)}
                      className="text-redpapilles w-50 border boder-redpapilles"
                      txt="Fermer"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}
         {isAddModal &&
          (<div className="fixed inset-0 bg-opacity-50 flex items-center justify-center overflow-y-auto">
             <div className="bg-white p-4 rounded max-w-lg shadow-lg max-h-[80vh] overflow-y-auto">
           <AddRecipe setIsAddModal={setIsAddModal} recipe={null}/>
           </div>
         </div>
           )}
        <Footer />
      </div>
    </>
  );
}
