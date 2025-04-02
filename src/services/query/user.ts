import { gql } from "@apollo/client";

export const GET_USER = gql`
query User($userId: ID!) {
  user(id: $userId) {
    id
    email
    nom
    prenom
    avatar
    pseudo
    recettes {
      id
      titre
      description
      ingredients
      tps_prep
      tps_cook
      nb_person
      dificulty
      est_public
      cout
      note
      instructions
      categorie
      img
      dateCreation
    }
    favoris {
      id
      titre
      description
      ingredients
      tps_prep
      tps_cook
      nb_person
      dificulty
      est_public
      cout
      note
      instructions
      categorie
      img
      favoris
      dateCreation
      commentaire {
        contenu
        auteur {
          prenom
        }
        dateCreation
      }
    }
  }
}
`