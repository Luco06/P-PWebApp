"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { UserAtom } from "../utils/atoms";
import { useAtom } from "jotai";
import Footer from "../components/Footer";
import { RecipeType } from "../utils/atoms";
import { useMutation, useQuery } from "@apollo/client";
import { GET_RECIPE } from "@/services/query/recipe";
import { ADD_COMMENT } from "@/services/mutations/AddComment";
import CardRecipesprofile from "../components/CardRecipesProfile";
import CardRecipe from "../components/CardRecipe";
import Button from "../components/Button";
import Comments from "../components/Comments";
import Input from "../components/Input";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export default function Acceuil() {
  const formatDate = (timestamp: string): string => {
    const dateInMillis = parseInt(timestamp, 10); // Convertir en nombre
    if (isNaN(dateInMillis)) {
      return "Date invalide"; // Gérer le cas où la conversion échoue
    }

    const date = new Date(dateInMillis); // Créer un objet Date à partir du timestamp
    return formatDistanceToNow(date, { addSuffix: true, locale: fr });
  };

  const [user] = useAtom(UserAtom);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);
  const [commentaire, setCommentaire] = useState("");

  const { data } = useQuery(GET_RECIPE);
  useEffect(() => {
    if (data?.recettes) {
      const publicRecipes = data.recettes.filter(
        (recipe: RecipeType) => recipe.est_public === true
      );
      setRecipes(publicRecipes);
    }
    const storedToken = localStorage.getItem("authToken");
    if (!user || !storedToken) {
      setToken(null);
      return;
    }
    setToken(storedToken);
  }, [data, setRecipes, user]);

  const [CreateComment, { error }] = useMutation(ADD_COMMENT, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    refetchQueries: [{ query: GET_RECIPE }],
    onCompleted: () => {
      alert("Commentaire ajouté !");
      setCommentaire("");
    },
  });
  
  const handleAddComment = () => {
    if (!user?.id || !selectedRecipe?.id || !commentaire.trim()) {
      alert("Le commentaire ne peut pas être vide.");
      return;
    }
    CreateComment({
      variables: {
        input: {
          auteur: user.id,
          recette: selectedRecipe.id,
          contenu: commentaire.trim(),
        },
      },
    });
  };

  const handleRecipeClick = (recipe: RecipeType) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };
  console.log(recipes);
  console.log(commentaire, "Commentaire");
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
              <div>
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
                {user && (
                  <>
                    <Input
                      label=""
                      type="text"
                      value={commentaire}
                      name="commentaire"
                      id="commentaire"
                      required={true}
                      onChange={(e) => setCommentaire(e.target.value)}
                      className="w-96 m-auto"
                    />
                    <Button
                      disabled={!commentaire.trim()}
                      onClick={handleAddComment}
                      type="button"
                      className="text-redpapilles w-50 border boder-redpapilles"
                      txt="Envoyer"
                      
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
