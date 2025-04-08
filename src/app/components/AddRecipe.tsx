"use client";
import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import Image from "next/image";
import ToggleSwitch from "./ToggleSwitch";
import { useMutation } from "@apollo/client";
import { RecipeType } from "../utils/atoms";
import { ADD_RECIPE } from "@/services/mutations/addRecipe";
import { UserAtom } from "../utils/atoms";
import { useAtomValue } from "jotai";
import { GET_USER } from "@/services/query/user";
import SelectOption from "./SelectOption";

type AddRecipeProps = {
  recipe?: RecipeType | null;
  setIsAddModal: (value: boolean) => void;
};

export default function AddRecipe({ setIsAddModal }: AddRecipeProps) {
  const userInfo = useAtomValue(UserAtom);
  const [token, setToken] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [isFavoris, setIsFavoris] = useState(false);
  const [addRecipe, setAddRecipe] = useState({
    titre: "",
    description: "",
    ingredients: [""],
    instructions: [""],
    nb_person: "",
    tps_cook: "",
    tps_prep: "",
    categorie: "",
    dificulty: "",
    img: "",
    est_public: false,
    note: "",
    auteur: userInfo?.id,
    favoris: false,
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
        const img = document.createElement("img");
        img.src = reader.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) return;

          const maxWidth = 500;
          const scale = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scale;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);

          setAddRecipe((prev) => ({ ...prev, img: compressedDataUrl }));
        };
      };
    }
  };

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...addRecipe.ingredients];
    newIngredients[index] = value;
    setAddRecipe({ ...addRecipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setAddRecipe({
      ...addRecipe,
      ingredients: [...addRecipe.ingredients, ""],
    });
  };

  const removeIngredient = (index: number) => {
    if (Array.isArray(addRecipe.ingredients)) {
      const newIngredients = addRecipe.ingredients.filter(
        (_, i) => i !== index
      );
      setAddRecipe({ ...addRecipe, ingredients: newIngredients });
    }
  };

  const handleInstructionChange = (index: number, value: string) => {
    if (Array.isArray(addRecipe.instructions)) {
      const newInstructions: string[] = [...addRecipe.instructions];
      newInstructions[index] = value;
      setAddRecipe({ ...addRecipe, instructions: newInstructions });
    }
  };

  const addInstruction = () => {
    setAddRecipe({
      ...addRecipe,
      instructions: [...addRecipe.instructions, ""],
    });
  };

  const removeInstruction = (index: number) => {
    if (Array.isArray(addRecipe.instructions)) {
      const newInstructions = addRecipe.instructions.filter(
        (_, i) => i !== index
      );
      setAddRecipe({ ...addRecipe, instructions: newInstructions });
    }
  };
  const [CreateRecette] = useMutation(ADD_RECIPE, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    refetchQueries: [{ query: GET_USER, variables: { userId: userInfo?.id } }],
    onCompleted: () => {
      setIsAddModal(false);
      alert("Recette Ajouter !");
    },
  });
  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filteredCreate = Object.fromEntries(
      Object.entries(addRecipe).filter(([_unused, value]) => value !== "")
    );
    if (Object.keys(filteredCreate).length === 0) {
      alert("Aucuns champs envoyer.");
      return;
    }
    try {
      await CreateRecette({
        variables: {
          input: filteredCreate,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la création ! :", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleCreate}
      >
        {addRecipe.img && (
          <Image src={addRecipe.img} alt="pates" width={160} height={130} />
        )}
        <Input
          type="file"
          name="img"
          id="img"
          required={false}
          onChange={handleImageChange}
          className="text-redpapilles"
        />
        <Input
          type="text"
          name="titre"
          required={false}
          id="titre"
          value={addRecipe.titre}
          onChange={(e) =>
            setAddRecipe({ ...addRecipe, titre: e.target.value })
          }
          label="Titre"
          className="w-96"
        />
        <Input
          type="text"
          name="description"
          id="description"
          required={false}
          value={addRecipe.description}
          onChange={(e) =>
            setAddRecipe({ ...addRecipe, description: e.target.value })
          }
          label="Description"
          className="w-96"
        />

        <div className="w-full items-center">
          <h4 className="text-center">Ingrédients</h4>
          {addRecipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <Input
                name="ingredients"
                id="ingredients"
                required={false}
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                label={`Ingrédient ${index + 1}`}
                className="w-60"
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
          {addRecipe.instructions.map((instruction, index) => (
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
            type="button"
            txt="+ Ajouter Étape"
            onClick={addInstruction}
            className="bg-green-500 text-redpapilles px-3 mt-2"
          />
        </div>
        <div className="flex flex-col-2 justify-between items-center w-full">
          <Input
            id="personnes"
            required={false}
            type="text"
            name="personnes"
            value={addRecipe.nb_person}
            onChange={(e) =>
              setAddRecipe({ ...addRecipe, nb_person: e.target.value })
            }
            label="Personnes"
            className="w-30"
          />
        </div>
        <div className="flex flex-col-2 justify-between items-center w-full">
          <Input
            type="text"
            name="tps_prep"
            id="tps_prep"
            required={false}
            value={addRecipe.tps_prep}
            onChange={(e) =>
              setAddRecipe({ ...addRecipe, tps_prep: e.target.value })
            }
            label="Tps de Prep"
            className="w-30"
          />
          <Input
            id="cuisson"
            required={false}
            type="text"
            name="cuisson"
            value={addRecipe.tps_cook}
            onChange={(e) =>
              setAddRecipe({ ...addRecipe, tps_cook: e.target.value })
            }
            label="Cuisson"
            className="w-30"
          />
        </div>
        <div className="flex flex-col-2 justify-between items-center w-full">
          <SelectOption
            label="Difficulté"
            name="difficulte"
            options={[
              { label: "Difficulté", value: "", disabled: true },
              { label: "Facile", value: "Facile" },
              { label: "Moyen", value: "Moyen" },
              { label: "Difficile", value: "Difficile" },
            ]}
            value={addRecipe.dificulty}
            onChange={(e) =>
              setAddRecipe({ ...addRecipe, dificulty: e.target.value })
            }
          />
          <SelectOption
            label="Catégorie"
            name="categorie"
            options={[
              { label: "Catégorie", value: "", disabled: true },
              { label: "Viande", value: "Viande" },
              { label: "Végétarien", value: "Végétarien" },
              { label: "Poisson", value: "Poisson" },
              { label: "Desserts", value: "Desserts" },
              { label: "Boissons", value: "Boissons" },
              { label: "Sauce", value: "Sauce" },
            ]}
            value={addRecipe.categorie}
            onChange={(e) =>
              setAddRecipe({ ...addRecipe, categorie: e.target.value })
            }
          />
        </div>
        <div className="flex justify-around mt-3 items-center gap-x-4 w-full">
          <ToggleSwitch
            checked={isPublic}
            onChange={(checked) => {
              setIsPublic(checked);
              setAddRecipe({ ...addRecipe, est_public: checked });
            }}
            label="Publique"
          />
          <ToggleSwitch
            checked={isFavoris}
            onChange={(checked) => {
              setIsFavoris(checked);
              setAddRecipe({ ...addRecipe, favoris: checked });
            }}
            label="Favoris"
          />
        </div>
        <div className="flex flex-row items-center, justify-between ">
          <Button
            type="submit"
            className="text-redpapilles w-50 border boder-redpapilles"
            txt="Créer"
          />
          <Button
            onClick={() => setIsAddModal(false)}
            className="text-redpapilles w-50 border boder-redpapilles"
            txt="Fermer"
          />
        </div>
      </form>
    </div>
  );
}
