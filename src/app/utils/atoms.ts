import { atomWithStorage } from "jotai/utils";
type UserType  ={
    email: string;
    nom: string;
    prenom: string;
    avatar: string;
    pseudo: string;
    id: string;
    recettes: [];
}

export const UserAtom = atomWithStorage<UserType | null>("user", null);

