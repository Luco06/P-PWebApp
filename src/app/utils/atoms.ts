import { atomWithStorage } from "jotai/utils";
type UserType = {
  email: string;
  nom: string;
  prenom: string;
  avatar: string;
  pseudo: string;
  id: string;
  favoris: RecipeType[];
  recettes: RecipeType[];
};

export type RecipeType = {
  id: string;
  titre: string;
  description: string;
  ingredients: string[];
  tps_prep: string;
  tps_cook: string;
  nb_person: string;
  dificulty: string;
  est_public: boolean;
  cout: string;
  note: string;
  instructions: string;
  categorie: string;
  img: string;
  favoris: boolean;
  auteur: {
    prenom: string;
  };
  dateCreation: string;
  commentaire: {
    id: string;
    contenu: string;
    dateCreation: string;
    auteur: {
      id: string;
      prenom: string;
      avatar: string; 
    };
  }[];
};

export const UserAtom = atomWithStorage<UserType | null>("user", null);
