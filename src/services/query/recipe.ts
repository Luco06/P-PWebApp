import { gql } from "@apollo/client";

export const GET_RECIPE = gql`
query Recettes {
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
    favoris
    auteur {
      prenom
    }
    dateCreation
    commentaire {
      id
      contenu
      recette {
        id
      }
      auteur {
        prenom
        avatar
        
      }
    }
  }
}
`