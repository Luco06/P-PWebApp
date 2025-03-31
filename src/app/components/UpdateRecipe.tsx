"use client";
import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import Image from "next/image";
import ToggleSwitch from "./ToggleSwitch";
import { useMutation } from "@apollo/client";
import { UPDATE_RECIPE } from "@/services/updateRecipe";
import { RecipeType } from "../utils/atoms";

interface UpdateRecipeProps {
  recipe: RecipeType | null;
}

export default function UpdateRecipe({ recipe }: UpdateRecipeProps) {
  const [token, setToken] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(recipe?.est_public ?? false);
  const [isFavoris, setIsFavoris] = useState(recipe?.favoris ?? false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [recipeUpdate, setRecipeUpdate] = useState({
    titre: recipe?.titre || "",
    description: recipe?.description || "",
    ingredients: Array.isArray(recipe?.ingredients) ? recipe.ingredients : [""], // Assurez-vous que c'est un tableau
    instructions: Array.isArray(recipe?.instructions)
      ? recipe.instructions
      : [""], // Assurez-vous que c'est un tableau
    nb_person: recipe?.nb_person || "",
    tps_cook: recipe?.tps_cook || "",
    tps_prep: recipe?.tps_prep || "",
    categorie: recipe?.categorie || "",
    dificulty: recipe?.dificulty || "",
    img: "",
    est_public: recipe?.est_public ?? false,
    note: recipe?.note || "",
    favoris: recipe?.favoris ?? false,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setRecipeUpdate((prev) => ({ ...prev, img: reader.result as string }));
      };
    }
  };

  // Gérer le changement des ingrédients
  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...recipeUpdate.ingredients];
    newIngredients[index] = value; // Modifie directement la valeur de l'index
    setRecipeUpdate({ ...recipeUpdate, ingredients: newIngredients });
  };

  // Ajouter un ingrédient
  const addIngredient = () => {
    setRecipeUpdate({
      ...recipeUpdate,
      ingredients: [...recipeUpdate.ingredients, ""],
    });
  };

  const removeIngredient = (index: number) => {
    if (Array.isArray(recipeUpdate.ingredients)) {
      const newIngredients = recipeUpdate.ingredients.filter(
        (_, i) => i !== index
      );
      setRecipeUpdate({ ...recipeUpdate, ingredients: newIngredients });
    }
  };

  const handleInstructionChange = (index: number, value: string) => {
    if (Array.isArray(recipeUpdate.instructions)) {
      const newInstructions: string[] = [...recipeUpdate.instructions];
      newInstructions[index] = value;
      setRecipeUpdate({ ...recipeUpdate, instructions: newInstructions });
    }
  };

  // Ajouter une instruction
  const addInstruction = () => {
    setRecipeUpdate({
      ...recipeUpdate,
      instructions: [...recipeUpdate.instructions, ""],
    });
  };

  const removeInstruction = (index: number) => {
    if (Array.isArray(recipeUpdate.instructions)) {
      const newInstructions = recipeUpdate.instructions.filter(
        (_, i) => i !== index
      );
      setRecipeUpdate({ ...recipeUpdate, instructions: newInstructions });
    }
  };

  const [updateRecipe] = useMutation(UPDATE_RECIPE, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onCompleted: () => {
      alert("Recette mise à jour !");
    },
  });
  return (
    <div className="flex flex-col items-center justify-center">
        
      {recipeUpdate.img && (
        <Image src={recipeUpdate.img} alt="pates" width={160} height={130} />
      )}
      <Input
        type="file"
        name="avatar"
        id="avatar"
        required={false}
        onChange={handleImageChange}
        className="text-redpapilles"
      />
      <Input
        type="text"
        name="titre"
        required={false}
        id="titre"
        value={recipeUpdate.titre}
        onChange={(e) =>
          setRecipeUpdate({ ...recipeUpdate, titre: e.target.value })
        }
        label="Titre"
        className="w-96"
      />
      <Input
        type="text"
        name="description"
        id="description"
        required={false}
        value={recipeUpdate.description}
        onChange={(e) =>
          setRecipeUpdate({ ...recipeUpdate, description: e.target.value })
        }
        label="Description"
        className="w-96"
      />

      <div className="w-full items-center">
        <h4 className="text-center">Ingrédients</h4>
        {recipeUpdate.ingredients.map((ingredient, index) => (
          <div key={index} className="flex space-x-2 mb-2">
            <Input
              name="ingredients"
              id="ingredients"
              required={false}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              label={`Ingrédient ${index + 1}`}
              className="w-40"
            />
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="cursor-pointer text-white px-2"
            >
              🗑
            </button>
          </div>
        ))}
        <Button
          txt="+ Ajouter Ingrédient"
          type="button"
          onClick={addIngredient}
          className="bg-green-500 text-redpapilles px-3 mt-2"
        />
      </div>

      <div className="w-full mt-4">
        <h4 className="text-center">Instructions</h4>
        {recipeUpdate.instructions.map((instruction, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input
              name="instruction"
              id="instruction"
              required={false}
              type="text"
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              label={`Étape ${index + 1}`}
              className="w-80"
            />
            <button
              onClick={() => removeInstruction(index)}
              className="cursor-pointer text-white px-2"
            >
              🗑
            </button>
          </div>
        ))}
        <Button
          txt="+ Ajouter Étape"
          onClick={addInstruction}
          className="bg-green-500 text-redpapilles px-3 mt-2"
        />
      </div>

      {/* Autres champs de la recette */}
      <div className="flex flex-col-2 justify-between items-center w-full">
        <Input
          id="personnes"
          required={false}
          type="text"
          name="personnes"
          value={recipeUpdate.nb_person}
          onChange={(e) =>
            setRecipeUpdate({ ...recipeUpdate, nb_person: e.target.value })
          }
          label="Personnes"
          className="w-30"
        />
        <Input
          id="cuisson"
          required={false}
          type="text"
          name="cuisson"
          value={recipeUpdate.tps_cook}
          onChange={(e) =>
            setRecipeUpdate({ ...recipeUpdate, tps_cook: e.target.value })
          }
          label="Cuisson"
          className="w-30"
        />
      </div>
      <div className="flex flex-col-2 justify-between items-center w-full">
        <Input
          type="text"
          name="tps_prep"
          id="tps_prep"
          required={false}
          value={recipeUpdate.tps_prep}
          onChange={(e) =>
            setRecipeUpdate({ ...recipeUpdate, tps_prep: e.target.value })
          }
          label="Tps de Prep"
          className="w-30"
        />
        <Input
          type="text"
          name="categorie"
          id="categorie"
          required={false}
          value={recipeUpdate.categorie}
          onChange={(e) =>
            setRecipeUpdate({ ...recipeUpdate, categorie: e.target.value })
          }
          label="Catégorie"
          className="w-30"
        />
      </div>
      <div className="flex justify-center items-center gap-x-4 w-full">
        <Input
          type="text"
          name="difficulté"
          id="difficulté"
          required={false}
          value={recipeUpdate.dificulty}
          onChange={(e) =>
            setRecipeUpdate({ ...recipeUpdate, dificulty: e.target.value })
          }
          label="Difficulté"
          className="w-35"
        />
        <ToggleSwitch
          checked={isPublic}
          onChange={(checked) => {
            setIsPublic(checked);
            setRecipeUpdate({ ...recipeUpdate, est_public: checked });
          }}
          label="Publique"
        />
        <ToggleSwitch
          checked={isFavoris}
          onChange={(checked) => {
            setIsFavoris(checked);
            setRecipeUpdate({ ...recipeUpdate, favoris: checked });
          }}
          label="Favoris"
        />
      </div>
      <div className="flex flex-row items-center, justify-between ">
        <Button
          onClick={() => {
            updateRecipe({ variables: { input: recipeUpdate, updateRecetteId:recipe?.id } });
          }}
          className="text-redpapilles w-50 border boder-redpapilles"
          txt="Mettre à jour"
        />
      </div>
    </div>
  );
}
