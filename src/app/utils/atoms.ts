import { atomWithStorage } from "jotai/utils";
type UserType  ={
    email: string;
    nom: string;
    prenom: string;
    avatar: string;
    pseudo: string;
    id: string;
    recettes: RecipeType[];
}

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
    commentaire: string[];
}

export const UserAtom = atomWithStorage<UserType | null>("user", null);

